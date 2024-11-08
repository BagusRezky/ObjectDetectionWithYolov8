import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mqtt from "mqtt";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";
import TopBar from "../components/topbar/TopBar";
import "../../src/index.css";
import { IconCalendar, IconClockHour1, IconClockHour5, IconLabel, IconMapPin } from "@tabler/icons-react";
import CustomIconLabel from "../components/label/CustomIconLabel";

function BillboardDetail() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [interactions, setInteractions] = useState({
    going_down: 0,
    going_up: 0,
  });

  // State untuk tanggal dan waktu
  const [currentTime, setCurrentTime] = useState({
    date: "",
    time: "",
  });

  // Fungsi untuk format tanggal dan waktu
  const formatDateTime = () => {
    const now = new Date();

    // Format hari (dalam bahasa Indonesia)
    const days = [
      "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",
    ];
    const dayName = days[now.getDay()];

    // Format tanggal dalam format DD MMMM YYYY
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const formattedDate = `${dayName}, ${day} ${month} ${year}`;

    // Format waktu dalam format HH.MM
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}.${minutes}`;

    return { formattedDate, formattedTime };
  };

  // Mengambil tanggal dan waktu setiap detik
  useEffect(() => {
    const updateDateTime = () => {
      const { formattedDate, formattedTime } = formatDateTime();
      setCurrentTime({
        date: formattedDate,
        time: formattedTime,
      });
    };

    updateDateTime(); // Memanggil pertama kali
    const intervalId = setInterval(updateDateTime, 1000); // Perbarui setiap detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen unmount
  }, []);

  useEffect(() => {
    if (!videoUrl) {
      const fetchHlsManifest = async () => {
        try {
          const response = await axios.get("http://103.245.38.40/hls/test.m3u8");
          if (response.status === 200) {
            setVideoUrl("http://103.245.38.40/hls/test.m3u8");
            setIsReady(true);
          }
        } catch (error) {
          console.error("Error fetching HLS manifest:", error);
        }
      };
      fetchHlsManifest();
    }
  }, [videoUrl]);

  useEffect(() => {
    if (isReady && videoRef.current) {
      const videoElement = videoRef.current;

      if (!playerRef.current) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoUrl);
          hls.attachMedia(videoElement);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.muted = true;
            videoElement.play().catch((error) => {
              console.error("Error attempting to play:", error);
            });
          });
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = videoUrl;
          videoElement.addEventListener("loadedmetadata", () => {
            videoElement.muted = true;
            videoElement.play().catch((error) => {
              console.error("Error attempting to play:", error);
            });
          });
        }

        playerRef.current = videojs(videoElement, {
          autoplay: true,
          muted: true,
          controls: false,
          techOrder: ["html5"],
        });

        playerRef.current.on("ready", () => {
          console.log("Video.js player is ready");
          videoElement.muted = true;
          videoElement.play().catch((error) => {
            console.error("Error attempting to play:", error);
          });
        });

        playerRef.current.on("error", (e) => {
          console.error("Error with video.js player:", e);
        });
      }

      return () => {
        if (playerRef.current) {
          // Jangan dispose player saat komponen di-unmount
        }
      };
    }
  }, [isReady, videoUrl]);

  useEffect(() => {
    const client = mqtt.connect("ws://103.245.38.40:9001/mqtt");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("vehicle/interactions", (err) => {
        if (!err) {
          console.log("Subscribed to vehicle/interactions");
        }
      });
    });

    client.on("message", (topic, message) => {
      if (topic === "vehicle/interactions") {
        const data = JSON.parse(message.toString());
        console.log("Received MQTT message:", data);
        setInteractions(data);
      }
    });

    client.on("error", (err) => {
      console.error("MQTT Connection Error: ", err);
    });

    return () => {
      client.end();
    };
  }, []);

  const billboard = {
    id,
    size: "4x8",
    location: "Jl. Soekarno Hatta",
  };

  return (
    <div className="flex flex-col">
      <TopBar title="Billboard Detail" />
      <div className="safe-area-page flex flex-col gap-4">
        <div className="grid grid-cols-8 gap-4">
          <div className="custom-card aspect-auto h-fit col-span-8 lg:col-span-6 flex flex-col gap-4">

            {!isReady &&
              (
                <span className="rounded overflow-hidden aspect-[4/3] w-full bg-neutral-100"> 
                </span>
              )}
            {isReady &&
              (
                <div className="rounded overflow-hidden">
                  <video
                    ref={videoRef}
                    id="rtmp-video"
                    className="video-js vjs-fluid vjs-default-skin rounded"
                    width={640}
                    height={480}
                    autoPlay
                    muted
                  ></video>
                </div>
              )}

          </div>
          {!isReady && (
            <div className="custom-card h-fit col-span-8 lg:col-span-2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="h-6 w-[120px] rounded-full bg-neutral-100 mb-2"></span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="h-5 w-5 rounded-full bg-neutral-100"></span>
                    <span className="h-5 w-[100px] rounded-full bg-neutral-100"></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-5 w-5 rounded-full bg-neutral-100"></span>
                    <span className="h-5 w-[100px] rounded-full bg-neutral-100"></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-5 w-5 rounded-full bg-neutral-100"></span>
                    <span className="h-5 w-[100px] rounded-full bg-neutral-100"></span>
                  </div>

                </div>
              </div>
              <div className="grid grid-cols-1 grid-rows-2 gap-4 h-[240px]">
                <span className="flex flex-col items-center justify-center py-3 gap-2 h-full bg-neutral-100 rounded-lg">
                </span>
                <span className="flex flex-col items-center justify-center py-3 gap-2 h-full bg-neutral-100 rounded-lg">
                </span>
              </div>
            </div>
          )}
          {isReady && (
            <div className="custom-card h-fit col-span-8 lg:col-span-2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-inter-tight font-medium text-xl text-neutral-black">Interaksi</h3>
                <div className="flex flex-col gap-2">
                  <CustomIconLabel icon={IconCalendar} label={`${currentTime.date}`} color="#1B1B1B" />
                  <CustomIconLabel icon={IconClockHour5} label={`${currentTime.time}`} color="#1B1B1B" />
                  <CustomIconLabel icon={IconMapPin} label={`${billboard.location}`} color="#1B1B1B" />
                </div>
              </div>
              <div className="grid grid-cols-1 grid-rows-2 gap-4 flex-grow">
                <div className="flex flex-col items-center justify-center py-3 gap-2 h-full bg-slate-100 rounded-lg">
                  <h4 className="font-inter-tight font-medium text-base text-navy text-opacity-40">Going Up</h4>
                  <p className="font-inter-tight font-semibold text-[72px] text-navy ">{`${interactions.going_down}`}</p>
                </div>
                <div className="flex flex-col items-center justify-center py-3 gap-2 h-full bg-slate-100 rounded-lg">
                  <h4 className="font-inter-tight font-medium text-base text-navy text-opacity-40">Going Down</h4>
                  <p className="font-inter-tight font-semibold text-[72px] text-navy ">{`${interactions.going_up}`}</p>

                </div>
              </div>
            </div>

            // <div className="bg-gray-100 p-9 rounded">
            //   {/* Menampilkan waktu dinamis */}
            //   <p className="text-md mb-2">{`Hari/Tanggal: `}</p>
            //   <p className="text-md mb-2">{`Waktu: `}</p>
            //   <p className="text-md mb-2">{`Lokasi: `}</p>
            //   <div className="mt-10 text-center">
            //     <p className="text-2xl font-bold">Jumlah Interaksi</p>
            //     <p className="text-5xl font-bold">{`Down: `}</p>
            //     <p className="text-5xl font-bold">{`Up: `}</p>
            //   </div>
            // </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BillboardDetail;
