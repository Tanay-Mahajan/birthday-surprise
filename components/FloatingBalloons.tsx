"use client";

export default function FloatingBalloons() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="balloon"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i}s`,
          }}
        >
          🎈
        </div>
      ))}
    </>
  );
}