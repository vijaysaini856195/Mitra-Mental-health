import React, { useEffect, useRef, useState } from "react";

type Props = {
  from?: number;
  to: number;
  duration?: number;
  formatter?: (n: number) => string;
};

export default function Counter({
  from = 0,
  to,
  duration = 2000,
  formatter,
}: Props) {
  const [n, setN] = useState(from);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    let raf: number;
    const tick = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (to - from) * eased;
      setN(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration]);
  const display = formatter ? formatter(n) : Math.round(n).toLocaleString();
  return <span>{display}</span>;
}
