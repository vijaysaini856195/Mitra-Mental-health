import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setHidden(isTouch);
    if (isTouch) return;

    const cursor = cursorRef.current!;
    const trail = trailRef.current!;
    const qx = gsap.quickTo(cursor, "x", { duration: 0.06, ease: "power2" });
    const qy = gsap.quickTo(cursor, "y", { duration: 0.06, ease: "power2" });
    const tx = gsap.quickTo(trail, "x", { duration: 0.25, ease: "power2" });
    const ty = gsap.quickTo(trail, "y", { duration: 0.25, ease: "power2" });

    const move = (e: MouseEvent) => {
      qx(e.clientX);
      qy(e.clientY);
      tx(e.clientX);
      ty(e.clientY);
      const el = e.target as HTMLElement;
      const role =
        el.closest("[data-cursor]")?.getAttribute("data-cursor") || "default";
      cursor.setAttribute("data-mode", role);
      trail.setAttribute("data-mode", role);
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
    };
  }, []);

  if (hidden) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        ref={trailRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full blur-xl opacity-40 bg-[#667eea] transition-[background-color,filter] duration-300 data-[mode=crisis]:bg-red-500 data-[mode=text]:bg-white/80 data-[mode=testimonial]:bg-pink-400"
      />
      <div
        ref={cursorRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow data-[mode=button]:scale-[2] data-[mode=text]:w-8 data-[mode=text]:h-1 data-[mode=crisis]:animate-pulse data-[mode=testimonial]:rounded-[40%_60%_60%_40%/40%_40%_60%_60%] transition-all duration-75"
      />
    </div>
  );
}
