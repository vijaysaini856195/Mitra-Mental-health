import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import TypingDots from "@/components/mitra/TypingDots";
import SOSButton from "@/components/mitra/SOSButton";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Msg = { id: string; role: "bot" | "user"; text: string };

const seed: Msg[] = [
  { id: "1", role: "bot", text: "Hey bestie! Noticed you're up late again 🌙" },
  { id: "2", role: "user", text: "Can't sleep, exam stress" },
  { id: "3", role: "bot", text: "Oof that's rough! Let's try the 4-7-8 breathing technique..." },
];

export default function StudentChat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const msg: Msg = { id: Math.random().toString(36).slice(2), role: "user", text: input.trim() };
    setMessages((m) => [...m, msg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Math.random().toString(36).slice(2), role: "bot", text: replyTo(msg.text) }]);
    }, 800);
  };

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
      <div className="rounded-xl border bg-background overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b bg-muted/40 text-sm font-medium">MITRA Chat 💜 - Your 24/7 Mental Health Bestie</div>
        <div className="flex-1 p-4 space-y-3 overflow-auto">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.role === "bot" ? "bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20" : "bg-primary text-primary-foreground ml-auto"}`}>
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="max-w-[60%] rounded-2xl px-3 py-2 bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 text-foreground inline-flex items-center gap-2">
              <span>Mitra is typing</span> <TypingDots />
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div className="p-3 border-t flex items-center gap-2">
          <MoodSelector onSelect={(m) => setMessages((x) => [...x, { id: Math.random().toString(36).slice(2), role: "user", text: `Mood check-in: ${m}` }])} />
          <input className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
          <Button onClick={send}>Send</Button>
        </div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-2">Quick actions</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Button variant="outline" asChild><a href="/app/crisis">Crisis Help</a></Button>
            <Button variant="outline" onClick={() => setMessages((m) => [...m, { id: Math.random().toString(36).slice(2), role: 'bot', text: "Inhale 4, hold 7, exhale 8. Repeat 4 times." }])}>Breathing Exercise</Button>
            <Button variant="outline" asChild><a href="tel:9820466726">Call Counselor</a></Button>
            <Button variant="outline" asChild><a href="/app/student/mood">Mood Tracker</a></Button>
          </div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-2">Mood history</div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={Array.from({ length: 14 }).map((_, i) => ({ d: i + 1, m: 50 + Math.sin(i / 2) * 20 + 10 }))}>
                <XAxis dataKey="d" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="m" stroke="#764ba2" strokeWidth={2} dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border p-4 text-sm">
          <div className="font-medium">Daily check-in streak</div>
          <div className="text-2xl font-bold mt-1">🔥 7 days</div>
        </div>
      </aside>
      <SOSButton />
    </div>
  );
}

function MoodSelector({ onSelect }: { onSelect: (m: string) => void }) {
  const moods = ["😊", "🙂", "😐", "😔", "😰"];
  return (
    <div className="flex items-center gap-1">
      {moods.map((m) => (
        <button key={m} onClick={() => onSelect(m)} className="size-8 grid place-items-center text-lg hover:scale-110 transition-transform">{m}</button>
      ))}
    </div>
  );
}

function replyTo(text: string) {
  const t = text.toLowerCase();
  if (t.includes("sleep") || t.includes("insomnia")) return "Try putting your phone away 30 mins before bed and dim lights. We can do a body scan together.";
  if (t.includes("exam") || t.includes("stress")) return "Totally get it. Let's break tasks into tiny chunks and do 10 focused minutes. Ready?";
  if (t.includes("sad")) return "I'm here. Want to talk about what's making you feel this way?";
  return "I hear you. I'm on your side. Want a grounding exercise or a pep talk?";
}
