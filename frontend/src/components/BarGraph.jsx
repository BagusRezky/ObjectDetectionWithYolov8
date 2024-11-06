import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../../src/index.css";

const data = [
  { name: "B1", value: 300 },
  { name: "B2", value: 200 },
  { name: "B3", value: 400 },
  { name: "B4", value: 500 },
  { name: "B5", value: 700 },
  { name: "B6", value: 600 },
];

function BarGraph() {
  return (
    <div className="custom-card flex flex-col gap-4">
      <h4 className="font-inter-tight text-base font-regular text-neutral-black">
        Jumlah Interaksi per Billboard
      </h4>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data}>
          <Bar dataKey="value" fill="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarGraph;
