"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Petal = {
  left: number;
  drift: number;
  duration: number;
  delay: number;
  rotate: number;
  size: number;
};

export default function Petals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      drift: Math.random() * 120 - 60,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 5,
      rotate: Math.random() * 360,
      size: 18 + Math.random() * 12,
    }));

    // Generated only after hydration so server and client markup stay identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPetals(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${petal.left}vw`,
            y: "-10vh",
            rotate: petal.rotate,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `calc(${petal.left}vw + ${petal.drift}px)`,
            rotate: petal.rotate + 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: petal.size,
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}
