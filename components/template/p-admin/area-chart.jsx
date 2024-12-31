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
  Area,
  AreaChart,
} from "recharts";

export default function AreaGrowthChart() {
  const [data, setData] = useState([
    {
      date: "1403/1/1",
      sale: 2000,
    },
    {
      date: "1403/2/1",
      sale: 3000,
    },
    {
      date: "1403/3/1",
      sale: 4000,
    },
    {
      date: "1403/4/1",
      sale: 5000,
    },
    {
      date: "1403/5/1",
      sale: 2000,
    },
    {
      date: "1403/6/1",
      sale: 4000,
    },
    {
      date: "1403/7/1",
      sale: 1000,
    },
  ]);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={width >= 1000 ? 350 : 200}>
      <AreaChart width={800} height={350} data={data}>
        <XAxis dataKey={"date"} />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Area type="monotone" dataKey="sale" stroke="#2563eb" fill="#93c5fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
