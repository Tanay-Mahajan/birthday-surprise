"use client";

import { motion } from "framer-motion";

export default function Petals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: "-10vh",
            rotate: Math.random() * 360,
          }}
          animate={{
            y: "110vh",
            x: `calc(${Math.random() * 100}vw + ${
              Math.random() * 120 - 60
            }px)`,
            rotate: 360,
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}