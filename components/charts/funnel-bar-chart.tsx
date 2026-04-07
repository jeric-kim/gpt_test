'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function FunnelBarChart({ data }: { data: Array<{ step: string; count: number }> }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="step" type="category" width={110} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
