import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NotificationItem = {
  id: string;
  message: string;
  level: "info" | "warn" | "critical";
  time: Date;
};

const sample = [
  { message: "Risk score increased to 4.2", level: "critical" as const },
  { message: "Low mood detected 3 days in a row", level: "warn" as const },
  { message: "Sleep down 32% this week", level: "warn" as const },
  { message: "New check-in completed", level: "info" as const },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const unread = items.filter((i) => !("read" in (i as any))).length;

  useEffect(() => {
    const id = setInterval(() => {
      const s = sample[Math.floor(Math.random() * sample.length)];
      const item: NotificationItem = {
        id: Math.random().toString(36).slice(2),
        message: s.message,
        level: s.level,
        time: new Date(),
      };
      setItems((prev) => [item, ...prev].slice(0, 20));
      try {
        beep(s.level);
      } catch {}
    }, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="relative">
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-red-500 text-[10px] text-white grid place-items-center animate-pulse">
              {unread}
            </span>
          )}
        </div>
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-md border bg-background shadow-lg z-40">
          <div className="px-3 py-2 border-b text-sm font-medium">
            Notifications
          </div>
          <div className="max-h-72 overflow-auto">
            {items.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              <ul className="divide-y">
                {items.map((n) => (
                  <li
                    key={n.id}
                    className="px-3 py-2 text-sm flex items-start gap-2"
                  >
                    <span
                      className={cn(
                        "mt-1 size-2 rounded-full",
                        n.level === "critical" && "bg-red-500",
                        n.level === "warn" && "bg-yellow-500",
                        n.level === "info" && "bg-brand-blue",
                      )}
                    ></span>
                    <div className="flex-1">
                      <div>{n.message}</div>
                      <div className="text-xs text-muted-foreground">
                        {n.time.toLocaleTimeString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function beep(level: NotificationItem["level"]) {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = level === "critical" ? 880 : level === "warn" ? 660 : 520;
  g.gain.value = 0.01;
  o.connect(g);
  g.connect(ctx.destination);
  o.start();
  setTimeout(() => {
    o.stop();
    ctx.close();
  }, 160);
}
