import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrendingUp, NotebookText, Smile, CalendarClock } from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMemo } from "react";

const lineData = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  mood: Math.round(50 + 30 * Math.sin(i / 2) + (Math.random() * 20 - 10)),
}));

const pieData = [
  { name: "Happy", value: 38, color: "hsl(var(--brand-green))" },
  { name: "Calm", value: 22, color: "hsl(var(--brand-blue))" },
  { name: "Anxious", value: 18, color: "hsl(var(--brand-purple))" },
  { name: "Sad", value: 12, color: "hsl(var(--muted-foreground))" },
  { name: "Neutral", value: 10, color: "hsl(var(--primary))" },
];

export default function Dashboard() {
  const heatmap = useMemo(() => generateHeatmap(), []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Welcome back, Vijay</h1>
        <p className="text-muted-foreground">“Every feeling is a messenger. Listen, then let it pass.”</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Mood Score (today)" value="7.9/10" icon={<Smile className="text-brand-purple" />} trend="+0.4" />
        <StatCard title="Journals Logged (this week)" value="12" icon={<NotebookPen className="text-brand-blue" />} trend="+3" />
        <StatCard title="Positive vs Negative" value="68% / 32%" icon={<TrendingUp className="text-brand-green" />} />
        <StatCard title="Upcoming Check-in" value="Thu 4:30 PM" icon={<CalendarClock className="text-primary" />} />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Mood Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={lineData}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--brand-purple))" strokeWidth={3} dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Emotion Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Mood Map</CardTitle>
          </CardHeader>
          <CardContent>
            <HeatmapGrid data={heatmap} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Alerts & Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Insight text="Increased anxiety in evenings" tone="warn" />
            <Insight text="Low mood trend in last 3 days" tone="alert" />
            <Insight text="Higher positivity after morning walks" tone="good" />
            <Insight text="Better sleep correlates with calmer tone" tone="info" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatCard({ title, value, trend, icon }: { title: string; value: string; trend?: string; icon: React.ReactNode }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="size-9 grid place-items-center rounded-md bg-muted/60">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          {trend && <span className="text-xs text-brand-green">{trend}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

function HeatmapGrid({ data }: { data: number[][] }) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">Emotional intensity over time</div>
      <div className="grid grid-cols-14 gap-1">
        {data.flatMap((row, r) =>
          row.map((v, c) => (
            <div
              key={`${r}-${c}`}
              className={cn(
                "h-4 w-4 rounded",
                "transition-all duration-300",
                intensityToClass(v),
              )}
              title={`Day ${r + 1}, Hour ${c}: ${v}`}
            />
          )),
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Low</span>
        <div className="h-2 flex-1 rounded bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green" />
        <span>High</span>
      </div>
    </div>
  );
}

function intensityToClass(v: number) {
  if (v < 20) return "bg-brand-blue/30";
  if (v < 40) return "bg-brand-blue/60";
  if (v < 60) return "bg-brand-purple/60";
  if (v < 80) return "bg-brand-purple/80";
  return "bg-brand-green/80";
}

function generateHeatmap() {
  const days = 7; // rows
  const hours = 14; // cols (condensed)
  const grid: number[][] = [];
  for (let d = 0; d < days; d++) {
    const row: number[] = [];
    for (let h = 0; h < hours; h++) {
      const base = 50 + 30 * Math.sin((d + h / 2) / 2);
      const noise = Math.random() * 30 - 15;
      row.push(Math.max(0, Math.min(100, Math.round(base + noise))));
    }
    grid.push(row);
  }
  return grid;
}

function Insight({ text, tone }: { text: string; tone: "warn" | "alert" | "good" | "info" }) {
  const toneClass =
    tone === "good"
      ? "border-l-4 border-brand-green/70"
      : tone === "warn"
      ? "border-l-4 border-brand-purple/60"
      : tone === "alert"
      ? "border-l-4 border-destructive/70"
      : "border-l-4 border-brand-blue/60";

  return (
    <div className={cn("rounded-md p-3 bg-muted/50", toneClass)}>
      <div className="text-sm">{text}</div>
    </div>
  );
}
