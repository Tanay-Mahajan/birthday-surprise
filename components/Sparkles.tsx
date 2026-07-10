"use client";

import { motion } from "framer-motion";

export default function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 35 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.3, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}