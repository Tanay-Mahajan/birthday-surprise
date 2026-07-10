"use client";

import { motion } from "framer-motion";

const balloons = ["🎈", "🎈", "🎈", "🎀", "🎉"];

export default function FloatingBalloons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl"
          initial={{
            x: `${10 + Math.random() * 80}vw`,
            y: "110vh",
            rotate: -10 + Math.random() * 20,
            scale: 0.8 + Math.random() * 0.4,
          }}
          animate={{
            y: "-20vh",
            x: `calc(${10 + Math.random() * 80}vw + ${
              Math.random() * 80 - 40
            }px)`,
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {balloons[Math.floor(Math.random() * balloons.length)]}
        </motion.div>
      ))}
    </div>
  );
}