import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: number; // 0-10
  size?: number; // px
  label?: string;
  showZones?: boolean;
};

export default function Gauge({
  value,
  size = 160,
  label,
  showZones = true,
}: Props) {
  const [anim, setAnim] = useState(0);
  useEffect(() => {
    const target = Math.max(0, Math.min(10, value));
    let raf: number;
    const start = anim;
    const diff = target - start;
    const startTs = performance.now();
    const dur = 700;
    const step = (t: number) => {
      const p = Math.min(1, (t - startTs) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnim(start + diff * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const { stroke, zone } = useMemo(() => {
    if (anim < 4) return { stroke: "#22c55e", zone: "green" };
    if (anim < 7) return { stroke: "#eab308", zone: "yellow" };
    return { stroke: "#ef4444", zone: "red" };
  }, [anim]);

  const r = (size - 20) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const percent = anim / 10;
  const dash = circumference * percent;

  return (
    <div
      className="inline-grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={14}
        />
        {showZones && (
          <g>
            <Arc cx={cx} cy={cy} r={r} start={0} end={0.3} color="#22c55e" />
            <Arc cx={cx} cy={cy} r={r} start={0.3} end={0.6} color="#eab308" />
            <Arc cx={cx} cy={cy} r={r} start={0.6} end={1} color="#ef4444" />
          </g>
        )}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={16}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      <div className="-mt-24 text-center">
        <div
          className={cn(
            "text-4xl font-bold tabular-nums",
            zone === "red" && "text-red-500",
            zone === "yellow" && "text-yellow-500",
            zone === "green" && "text-green-500",
          )}
        >
          {anim.toFixed(1)}
        </div>
        <div className="text-xs text-muted-foreground">
          {label ?? "Risk Score"}
        </div>
      </div>
    </div>
  );
}

function Arc({
  cx,
  cy,
  r,
  start,
  end,
  color,
}: {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  color: string;
}) {
  const a0 = (start * 360 - 90) * (Math.PI / 180);
  const a1 = (end * 360 - 90) * (Math.PI / 180);
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const largeArc = end - start > 0.5 ? 1 : 0;
  const d = `M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1}`;
  return <path d={d} stroke={color} strokeWidth={8} fill="none" />;
}
