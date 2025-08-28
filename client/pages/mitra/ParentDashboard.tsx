import React from "react";
import Gauge from "@/components/mitra/Gauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight, HeartPulse, Moon, Smile, Smartphone, UsersRound } from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SOSButton from "@/components/mitra/SOSButton";

const days = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  score: Math.max(1.5, 6 - i * 0.08 + Math.sin(i / 3) * 0.2),
}));

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Monitoring: Arjun</h1>
          <p className="text-sm text-muted-foreground">Real-time mental health overview</p>
        </div>
        <Button asChild>
          <a href="/app/coaching"><ArrowRight className="mr-2" /> Get Coaching</a>
        </Button>
      </div>

      <div className="rounded-xl border bg-red-50 text-red-700 border-red-200 p-3 flex items-center gap-2">
        <AlertTriangle className="shrink-0" />
        <span className="font-medium">Multiple concerning patterns detected - Immediate attention needed</span>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 flex items-center justify-center">
          <CardContent className="p-6">
            <Gauge value={4.2} label="Risk Score (0-10)" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <Metric title="Sleep" value="3.5/10" tone="red" icon={<Moon />} />
          <Metric title="Social" value="4.1/10" tone="yellow" icon={<UsersRound />} />
          <Metric title="Mood" value="2.8/10" tone="red" icon={<Smile />} />
          <Metric title="Screen Time" value="14 hours" tone="red" icon={<Smartphone />} />
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle className="text-base">30-day Risk Trend</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={days}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 10]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={3} dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">AI Coaching</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Don't confront directly. Suggest a movie night this weekend and keep things light.</p>
            <p>Validate feelings: "Exams can be overwhelming. I'm here with you."</p>
            <p>Offer choices: Ask if they'd prefer a walk or listen to music together.</p>
            <Button asChild className="w-full"><a href="/app/coaching">Open Coaching</a></Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle className="text-base">Recent Alerts</CardTitle></CardHeader>
          <CardContent>
            <Timeline items={[
              { t: "Today 10:22", text: "Risk score increased to 4.2 (red zone)" },
              { t: "Yesterday 23:10", text: "Awake past 2am for 3rd day" },
              { t: "2 days ago", text: "Social messages down 45%" },
              { t: "3 days ago", text: "Screen time 14h, mostly late night" },
            ]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Get Professional Help</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={() => alert("Connecting counselor...")}>Connect to Counselor</Button>
            <Button variant="outline" className="w-full" asChild><a href="tel:9820466726"><HeartPulse className="mr-2" /> Call Crisis Hotline</a></Button>
          </CardContent>
        </Card>
      </section>

      <SOSButton />
    </div>
  );
}

function Metric({ title, value, tone, icon }: { title: string; value: string; tone: "red" | "yellow" | "green"; icon: React.ReactNode }) {
  const toneClasses = tone === "red" ? "bg-red-50 text-red-700 border-red-200" : tone === "yellow" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200";
  return (
    <div className={`rounded-xl border p-4 ${toneClasses}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-current/80">{title}</div>
        <div className="opacity-70">{icon}</div>
      </div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

function Timeline({ items }: { items: { t: string; text: string }[] }) {
  return (
    <ul className="space-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1 size-2 rounded-full bg-red-500" />
          <div>
            <div className="text-sm">{it.text}</div>
            <div className="text-xs text-muted-foreground">{it.t}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
