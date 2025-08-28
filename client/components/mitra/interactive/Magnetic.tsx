import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({
  children,
  strength = 0.3,
  radius = 60,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.2,
          overwrite: true,
        });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, overwrite: true });
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [strength, radius]);

  return (
    <div ref={ref} className={className} data-cursor="button">
      {children}
    </div>
  );
}
