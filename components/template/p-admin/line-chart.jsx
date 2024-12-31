"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  LineChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineGrowthChart() {
  const [data, setData] = useState([
    {
      date: "1403/1/1",
      current: 2000,
      prev: 1000,
    },
    {
      date: "1403/2/1",
      current: 3000,
      prev: 2000,
    },
    {
      date: "1403/3/1",
      current: 4000,
      prev: 3000,
    },
    {
      date: "1403/4/1",
      current: 5000,
      prev: 4000,
    },
    {
      date: "1403/5/1",
      current: 2000,
      prev: 5000,
    },
  ]);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={width >= 1000 ? 350 : 200}>
      <LineChart width={800} height={350} data={data}>
        <XAxis dataKey={"date"} />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="current" stroke="#16a34a" />
        <Line type="monotone" dataKey="prev" stroke="#2563eb" />
      </LineChart>
    </ResponsiveContainer>
  );
}
