"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Sparkle = {
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
};

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 35 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 4,
      size: 12 + Math.random() * 10,
    }));

    setSparkles(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${sparkle.left}vw`,
            y: `${sparkle.top}vh`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.4, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            fontSize: sparkle.size,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}