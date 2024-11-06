import { useState, useEffect } from "react";
import '../../src/index.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LineGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  },);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/interactions/BillboardA"
      );
      const jsonData = await response.json();
      const processedData = processData(jsonData);
      setData(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processData = (rawData) => {
    const monthlyData = rawData.reduce((acc, item) => {
      const date = new Date(item.timestamp);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { going_down: 0, going_up: 0 };
      }

      acc[monthYear].going_down += item.going_down;
      acc[monthYear].going_up += item.going_up;

      return acc;
    }, {});

    return Object.entries(monthlyData).map(([date, values]) => ({
      name: date,
      total: values.going_down + values.going_up,
    }));
  };

  return (
    <div className="custom-card flex flex-col gap-4">
      <h4 className="font-inter-tight text-base font-regular text-neutral-black">
        Total Interaksi yang Melewati Billboard per Bulan
      </h4>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineGraph;
