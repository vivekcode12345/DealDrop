"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";

export default function PriceChart({ productId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);

      const chartData = history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: parseFloat(item.price),
      }));

      setData(chartData);
      setLoading(false);
    }

    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6 text-[#8B92A3] w-full text-xs">
        <Loader2 className="w-4 h-4 animate-spin mr-2 text-[#E8A33D]" />
        Loading price history...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-6 text-[#8B92A3] w-full text-xs">
        No price history recorded yet. Daily updates will log new data points.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-medium text-[#8B92A3]">
          Recorded Price Trend
        </h4>
        <span className="font-mono text-[11px] text-[#8B92A3]">
          {data.length} check{data.length === 1 ? "" : "s"}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#232937" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#8B92A3", fontFamily: "var(--font-geist-mono)" }}
            stroke="#232937"
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#8B92A3", fontFamily: "var(--font-geist-mono)" }}
            stroke="#232937"
            domain={["auto", "auto"]}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#12161F",
              border: "1px solid #232937",
              borderRadius: "4px",
              padding: "6px 10px",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono)",
              color: "#F5F6F8",
            }}
            labelStyle={{ color: "#8B92A3", fontSize: "11px", marginBottom: "2px" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#E8A33D"
            strokeWidth={1.75}
            dot={{ fill: "#E8A33D", r: 3 }}
            activeDot={{ r: 5, fill: "#F5F6F8", stroke: "#E8A33D", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
