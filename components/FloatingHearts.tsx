"use client";

import { motion } from "framer-motion";

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: "110vh",
            scale: 0.6 + Math.random() * 0.8,
            opacity: 0,
          }}
          animate={{
            y: "-15vh",
            opacity: [0, 1, 1, 0],
            rotate: [-20, 20, -20],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}