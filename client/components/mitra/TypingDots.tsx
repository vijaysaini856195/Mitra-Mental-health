import React from "react";

export default function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center">
      <span className="size-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.2s]" />
      <span className="size-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.1s]" />
      <span className="size-1.5 bg-current rounded-full animate-bounce" />
    </span>
  );
}
