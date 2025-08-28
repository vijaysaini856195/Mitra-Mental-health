import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EMOJIS = [
  { e: "😊", score: 5, label: "Great" },
  { e: "🙂", score: 4, label: "Good" },
  { e: "😐", score: 3, label: "Okay" },
  { e: "😔", score: 2, label: "Down" },
  { e: "😰", score: 1, label: "Anxious" },
];

export default function StudentMoodTracker() {
  const daysInMonth = 30;
  const [selected, setSelected] = useState<number | null>(null);
  const data = useMemo(() => Array.from({ length: daysInMonth }).map((_, i) => ({ d: i + 1, score: Math.max(1, Math.min(5, Math.round(2 + Math.sin(i / 3) * 1.5 + (i > 20 ? 1 : 0))))) })), []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Daily Mood Tracker</h1>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">How are you feeling today?</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {EMOJIS.map((m, idx) => (
                <button key={idx} onClick={() => setSelected(m.score)} className={`size-14 grid place-items-center rounded-xl text-3xl transition-transform hover:scale-110 ${selected === m.score ? 'ring-2 ring-[#667eea] bg-muted' : 'bg-muted/50'}`} title={m.label}>{m.e}</button>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">{selected ? `Selected: ${EMOJIS.find(e => e.score === selected)?.label}` : "Select an emoji to check in"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Mood Calendar</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {data.map((d) => (
                <div key={d.d} className="aspect-square rounded-lg grid place-items-center text-xl" title={`Day ${d.d}`}>
                  {EMOJIS.find((e) => e.score === d.score)?.e}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Mood Insights</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>Current streak: <b>3 days of feeling better!</b></div>
            <div>Weekly average mood score: <b>3.8</b></div>
            <div>Triggers identified: <b>Low mood often on Mondays</b></div>
            <div>AI suggestion: <b>Try morning walks on difficult days</b></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Journal</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <textarea className="w-full min-h-28 rounded-md border bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Want to write about today?" />
            <div className="text-sm text-muted-foreground">Badges: <span className="ml-1 inline-flex gap-2"><Badge text="Resilient" /><Badge text="Fighter" /><Badge text="Survivor" /></span></div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 text-foreground border text-xs">{text}</span>;
}