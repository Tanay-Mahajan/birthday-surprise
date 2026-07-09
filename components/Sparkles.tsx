"use client";

export default function Sparkles() {
  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ✨
        </span>
      ))}
    </>
  );
}