"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Balloon = {
  left: number;
  drift: number;
  duration: number;
  delay: number;
  rotate: number;
  scale: number;
  emoji: string;
};

const emojis = ["🎈", "🎈", "🎈", "🎀", "🎉"];

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 10 }).map(() => ({
      left: 10 + Math.random() * 80,
      drift: Math.random() * 80 - 40,
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 5,
      rotate: -10 + Math.random() * 20,
      scale: 0.8 + Math.random() * 0.5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    // Generated only after hydration so server and client markup stay identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBalloons(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {balloons.map((balloon, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${balloon.left}vw`,
            y: "110vh",
            rotate: balloon.rotate,
            scale: balloon.scale,
            opacity: 0,
          }}
          animate={{
            y: "-20vh",
            x: `calc(${balloon.left}vw + ${balloon.drift}px)`,
            rotate: [-8, 8, -8],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          {balloon.emoji}
        </motion.div>
      ))}
    </div>
  );
}
