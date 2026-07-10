"use client";

import { motion } from "framer-motion";

const hearts = [
  { left: "8%", delay: 0 },
  { left: "22%", delay: 1 },
  { left: "78%", delay: 2 },
  { left: "90%", delay: 3 },
];

const sparkles = [
  { top: "12%", left: "15%", delay: 0 },
  { top: "22%", left: "82%", delay: .5 },
  { top: "72%", left: "18%", delay: 1 },
  { top: "78%", left: "86%", delay: 1.5 },
  { top: "38%", left: "8%", delay: 2 },
  { top: "55%", left: "92%", delay: 2.5 },
];

const petals = [
  { left: "30%", delay: 0 },
  { left: "55%", delay: 1.5 },
  { left: "72%", delay: 3 },
];

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">

      {/* Hearts */}

      {hearts.map((item, i) => (

        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl"
          style={{ left: item.left, bottom: "-40px" }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, 15, -10, 0],
            opacity: [0, 1, 1, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            delay: item.delay,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>

      ))}

      {/* Sparkles */}

      {sparkles.map((item, i) => (

        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-xl"
          style={{
            top: item.top,
            left: item.left,
          }}
          animate={{
            scale: [0.6, 1.4, 0.6],
            opacity: [0.2, 1, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            delay: item.delay,
          }}
        >
          ✨
        </motion.div>

      ))}

      {/* Petals */}

      {petals.map((item, i) => (

        <motion.div
          key={`petal-${i}`}
          className="absolute text-xl"
          style={{
            left: item.left,
            top: "-40px",
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, 20, -20, 10],
            rotate: [0, 180, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
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