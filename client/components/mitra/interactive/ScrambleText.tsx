import React, { useEffect, useRef, useState } from "react";

export default function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => setDisplay(text), [text]);

  const onEnter = () => {
    const target = text;
    const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let i = 0;
    const id = setInterval(() => {
      setDisplay((prev) => prev.split("").map((ch, idx) => (idx < i ? target[idx] : letters[Math.floor(Math.random() * letters.length)] || "")).join(""));
      i++;
      if (i > target.length) clearInterval(id);
    }, 30);
  };

  return <span ref={ref} onMouseEnter={onEnter} className="cursor-default select-none" data-cursor="text">{display}</span>;
}
