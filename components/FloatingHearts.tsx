"use client";

export default function FloatingHearts() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * .5}s`,
            animationDuration: `${6 + Math.random() * 5}s`,
          }}
        >
          💖
        </div>
      ))}
    </>
  );
}