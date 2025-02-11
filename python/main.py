import cv2
import pandas as pd
from imutils.video import FPS
from ultralytics import YOLO
from tracker import Tracker
import json
import argparse
import time
import paho.mqtt.client as mqtt
import subprocess
import torch

# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# MQTT settings
MQTT_BROKER = "103.245.38.40"
MQTT_PORT = 1883
MQTT_TOPIC = "vehicle/interactions"

# Initialize MQTT client
mqtt_client = mqtt.Client()
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)

def load_model(path):
    return YOLO(path)

def read_labels(path):
    with open(path, 'r') as file:
        labels_list = file.read().strip().split('\n')
    print("Labels loaded:", labels_list)  # Cetak label untuk verifikasi
    return labels_list

def get_detections(frame, model, labels):
    results = model.predict(frame)
    res = results[0].boxes.data.cpu().numpy()
    boxes = pd.DataFrame(res).astype('float')
    detections = []

    for _, row in boxes.iterrows():
        x1, y1, x2, y2 = map(int, row[:4])
        d = int(row[5])
        if d >= len(labels):  # Periksa jika indeks melebihi panjang daftar label
            print("Label index out of range:", d)
            continue
        label = labels[d]
        if 'car' in label:
            detections.append([x1, y1, x2, y2])

    return detections

def process_bboxes(bbox_id, frame, cy1, cy2, offset, vh_down, counter, vh_up, counter1):
    for bbox in bbox_id:
        x3, y3, x4, y4, obj_id = bbox
        cx = int((x3 + x4) // 2)
        cy = int((y3 + y4) // 2)

        process_downward_movement(cy, cy1, cy2, offset, obj_id, vh_down, counter, frame, cx)
        process_upward_movement(cy, cy1, cy2, offset, obj_id, vh_up, counter1, frame, cx)

def process_downward_movement(cy, cy1, cy2, offset, obj_id, vh_down, counter, frame, cx):
    if cy1 - offset < cy < cy1 + offset:
        vh_down[obj_id] = cy
    if obj_id in vh_down and cy2 - offset < cy < cy2 + offset:
        mark_object(frame, cx, cy, obj_id)
        if obj_id not in counter:
            counter.append(obj_id)

def process_upward_movement(cy, cy1, cy2, offset, obj_id, vh_up, counter1, frame, cx):
    if cy2 - offset < cy < cy2 + offset:
        vh_up[obj_id] = cy
    if obj_id in vh_up and cy1 - offset < cy < cy1 + offset:
        mark_object(frame, cx, cy, obj_id)
        if obj_id not in counter1:
            counter1.append(obj_id)

def mark_object(frame, cx, cy, obj_id):
    cv2.circle(frame, (cx, cy), 4, (0, 0, 255), -1)
    cv2.putText(frame, str(obj_id), (cx, cy), cv2.FONT_HERSHEY_COMPLEX, 0.8, (0, 255, 255), 2)

def draw_lines(frame, cy1, cy2):
    cv2.line(frame, (70, cy1), (520, cy1), (255, 255, 255), 1)
    cv2.putText(frame, 'Line 1', (150, 318), cv2.FONT_HERSHEY_COMPLEX, 0.8, (0, 255, 255), 2)
    cv2.line(frame, (65, cy2), (580, cy2), (255, 255, 255), 1)
    cv2.putText(frame, 'Line 2', (130, 365), cv2.FONT_HERSHEY_COMPLEX, 0.8, (0, 255, 255), 2)

def publish_data(going_down, going_up):
    data = {
        "going_down": going_down,
        "going_up": going_up
    }
    mqtt_client.publish(MQTT_TOPIC, json.dumps(data))


def draw_counters(frame, counter, counter1):
    d = len(counter)
    cv2.putText(frame, f'Going Down: {d}', (60, 40), cv2.FONT_HERSHEY_COMPLEX, 0.8, (0, 255, 255), 2)
    u = len(counter1)
    cv2.putText(frame, f'Going Up: {u}', (60, 80), cv2.FONT_HERSHEY_COMPLEX, 0.8, (0, 255, 255), 2)
    publish_data(d, u)


def draw_fps(frame, num_frames, elapsed_time):
    fps = num_frames / elapsed_time if elapsed_time > 0 else 0
    txt_fps = f"FPS: {fps:.2f}"
    cv2.putText(frame, txt_fps, (60, 120), cv2.FONT_HERSHEY_COMPLEX, 0.8, (0, 255, 255), 2)

def reconnect_stream(max_retries=5, retry_interval=5):
    for attempt in range(max_retries):
        cap = cv2.VideoCapture('../percobaan2.mp4')
        #cap = cv2.VideoCapture('rtsp://admin:CRPBEB@192.168.88.229?rtsp_transport=tcp')
        if cap is not None:
            return cap
        time.sleep(retry_interval)
    return None

def main(model_path, labels_path, rtmp_url):
    tracker = Tracker()
    count = 0
    cy1, cy2, offset = 440, 470, 14

    vh_down, counter = {}, []
    vh_up, counter1 = {}, []

    cap = reconnect_stream()

    fps = FPS().start()  # Start the FPS counter
    start_time = time.time()  # Start the timer
    num_frames = 0  # Initialize the frame count

    model = load_model(model_path)
    labels = read_labels(labels_path)

    # Start FFmpeg process
    ffmpeg_cmd = [
    'ffmpeg',
            '-y',
            '-f', 'rawvideo',
            '-vcodec', 'rawvideo',
            '-pix_fmt', 'bgr24',
            '-s', '640x480',
            '-r', '15',
            '-i', '-',
            '-g', '15',
            '-c:v', 'libx264',
            '-b:v', '300k',
            '-preset', 'ultrafast',
            '-maxrate', '300k',
            '-bufsize', '600k',
            '-pix_fmt', 'yuv420p',
            '-g', '30',
            '-f', 'flv',
            rtmp_url,
    ]
    ffmpeg_process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    while True:
        ret, frame = cap.read()
        if not ret:
            cap.release()
            cap = reconnect_stream()
            if cap is None:
                break
            continue

        count += 1
        if count % 3 != 0:
            continue

        frame = cv2.resize(frame, (640, 480))

        detections = get_detections(frame, model, labels)
        bbox_id = tracker.update(detections)

        process_bboxes(bbox_id, frame, cy1, cy2, offset, vh_down, counter, vh_up, counter1)

        draw_lines(frame, cy1, cy2)
        draw_counters(frame, counter, counter1)

        num_frames += 1
        elapsed_time = time.time() - start_time  # Calculate elapsed time
        draw_fps(frame, num_frames, elapsed_time)  # Draw FPS on the frame

        # Write frame to FFmpeg process
        try:
            ffmpeg_process.stdin.write(frame.tobytes())
        except BrokenPipeError:
            # Handle broken pipe error (connection lost)
            print("Connection lost. Attempting to reconnect...")
            ffmpeg_process.stdin.close()
            ffmpeg_process.wait()
            ffmpeg_process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

        cv2.imshow('Object Counter Program', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    fps.stop()  # Stop the FPS counter when the loop exits
    cap.release()
    cv2.destroyAllWindows()
    ffmpeg_process.stdin.close()
    ffmpeg_process.wait()

    publish_data(len(counter), len(counter1))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Object detection and counting.')
    parser.add_argument('--model', default='./yolov5nu.pt', help='Model path')
    parser.add_argument('--labels', default='../coco.txt', help='Labels path')
    parser.add_argument('--rtmp', default='rtmp://103.245.38.40/live/test', help='RTMP URL')
    args = parser.parse_args()

    main(args.model, args.labels, args.rtmp)