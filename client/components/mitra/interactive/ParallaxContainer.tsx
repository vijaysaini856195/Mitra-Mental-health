import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
};

export default function ParallaxContainer({
  children,
  intensity = 20,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach((child) => {
        const d = parseFloat(child.dataset.depth || "0");
        gsap.to(child, {
          x: dx * intensity * d,
          y: dy * intensity * d,
          duration: 0.4,
          overwrite: true,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [intensity]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
