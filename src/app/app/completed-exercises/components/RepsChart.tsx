"use client";

import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  reps: number[];
};

export function RepsChart({ reps }: Props) {
  const data = reps.map((rep, index) => ({
    session: index + 1,
    reps: rep,
  }));

  return (
    <div className="flex items-center justify-center">
      {/* Flexbox for centering */}
      <ResponsiveContainer className={"rounded-lg border border-main dark:border-dark-main"} width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Balanced margins for centering
        >
          <YAxis className="font-geistMono" dataKey="reps" stroke="none" />
          <XAxis className="font-geistMono" dataKey="session" stroke="none" />
          <Tooltip
            contentStyle={{
              backgroundColor: "black", // Set tooltip background color to black
              border: "none",
              borderRadius: "10px",
              color: "white", // Set text color to white
            }}
            labelFormatter={(label) => `Session ${label}`}
            formatter={(value) => [`Reps: ${value}`]}
          />
          <Line
            type="monotone"
            dataKey="reps"
            stroke={"#2563eb"}
            strokeWidth={2} // Thicker line
            dot={false} // Removes the active points on the line
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
