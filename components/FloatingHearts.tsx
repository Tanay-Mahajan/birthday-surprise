"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Heart = {
  left: number;
  duration: number;
  delay: number;
  size: number;
};

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 18 }).map(() => ({
      left: Math.random() * 100,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 5,
      size: 20 + Math.random() * 18,
    }));

    // Generated only after hydration so server and client markup stay identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHearts(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${heart.left}vw`,
            y: "110vh",
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 1, 0],
            rotate: [-15, 15, -15],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: heart.size,
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}
