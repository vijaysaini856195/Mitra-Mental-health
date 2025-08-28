import React, { useEffect, useState } from "react";

export default function GlitchCounter({ start = 28 }: { start?: number }) {
  const [n, setN] = useState(start);
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v > 0 ? v - 1 : start)), 1000);
    return () => clearInterval(id);
  }, [start]);
  return (
    <span
      onMouseEnter={() => setGlitch(true)}
      onMouseLeave={() => setGlitch(false)}
      className={`tabular-nums ${glitch ? "animate-pulse" : ""}`}
      data-cursor="text"
    >
      {n}
    </span>
  );
}
