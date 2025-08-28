import React from "react";
import Gauge from "@/components/mitra/Gauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart,
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function RiskAnalysis() {
  const sleep = Array.from({ length: 7 }).map((_, i) => ({ d: `D${i + 1}`, h: Math.max(2, 7 - i * 0.4 + Math.sin(i) * 0.6) }));
  const social = Array.from({ length: 14 }).map((_, i) => ({ d: i + 1, c: Math.max(0, Math.round(40 + Math.sin(i / 2) * 10 - i)) }));
  const moods = [
    { name: "😊", value: 20, color: "#22c55e" },
    { name: "😐", value: 25, color: "#a78bfa" },
    { name: "😔", value: 30, color: "#eab308" },
    { name: "😰", value: 25, color: "#ef4444" },
  ];
  const screen = Array.from({ length: 24 }).map((_, i) => ({ h: i, t: Math.max(0, Math.round(0.3 * (i - 12) ** 2 - 20 + (i > 20 ? 25 : 0))) }));

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Risk Analysis</h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <Card className="lg:col-span-1 flex items-center justify-center"><CardContent className="p-6"><Gauge value={4.2} label="Risk Score 4.2/10" /></CardContent></Card>
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <Insight text="Critical: No sleep for 48 hours" level="red" />
          <Insight text="Warning: Social withdrawal detected" level="yellow" />
          <Insight text="Trend: 32% decline over 2 weeks" level="purple" />
          <Insight text="Night-time screen spikes" level="purple" />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Sleep Pattern (hrs)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleep}>
                <XAxis dataKey="d" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="h" fill="#667eea" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Social Activity (messages)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={social}>
                <XAxis dataKey="d" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="c" stroke="#a78bfa" strokeWidth={3} dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Mood Indicators</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={moods} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                  {moods.map((m, i) => <Cell key={i} fill={m.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Screen Time (hrs by hour)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={screen}>
                <XAxis dataKey="h" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="t" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1"><CardHeader><CardTitle className="text-base">Intervention Recommendations</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <div><b>Immediate:</b> Start conversation today</div>
            <div><b>This week:</b> Schedule counselor</div>
            <div><b>Long-term:</b> Family therapy suggested</div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle className="text-base">Time Ranges</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Use the charts above to compare 7 days / 30 days / 3 months trends with animated transitions.</CardContent>
        </Card>
      </section>
    </div>
  );
}

function Insight({ text, level }: { text: string; level: "red" | "yellow" | "purple" }) {
  const color = level === "red" ? "border-red-400" : level === "yellow" ? "border-yellow-400" : "border-purple-400";
  return <div className={`rounded-md p-3 bg-muted/50 border-l-4 ${color}`}>{text}</div>;
}
