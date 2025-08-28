import React, { useCallback, useRef } from "react";

export default function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 10}deg) rotateX(${py * -10}deg)`;
  }, []);

  const reset = useCallback(() => {
    const el = ref.current!;
    el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={className} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }}>
      {children}
    </div>
  );
}
