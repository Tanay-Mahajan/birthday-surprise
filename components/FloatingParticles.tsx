"use client";

import { motion } from "framer-motion";

const hearts = [
  { left: "8%", delay: 0 },
  { left: "22%", delay: 1.5 },
  { left: "76%", delay: 3 },
  { left: "90%", delay: 4.5 },
];

const sparkles = [
  { top: "12%", left: "15%", delay: 0 },
  { top: "25%", left: "85%", delay: 0.6 },
  { top: "68%", left: "12%", delay: 1.2 },
  { top: "78%", left: "88%", delay: 1.8 },
];

const petals = [
  { left: "28%", delay: 0 },
  { left: "50%", delay: 2 },
  { left: "75%", delay: 4 },
];

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">

      {/* Floating Hearts */}
      {hearts.map((item, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-xl will-change-transform"
          style={{ left: item.left, bottom: "-40px" }}
          animate={{
            y: "-110vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 9,
            delay: item.delay,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Shimmering Sparkles */}
      {sparkles.map((item, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-lg will-change-transform"
          style={{ top: item.top, left: item.left }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Falling Blossoms */}
      {petals.map((item, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute text-lg will-change-transform"
          style={{ left: item.left, top: "-40px" }}
          animate={{
            y: "110vh",
            rotate: 360,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 11,
            delay: item.delay,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}