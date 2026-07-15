"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
};

export default function PhotoCaption({ text }: Props) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm pointer-events-none"
    >
      <div className="relative rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.3)] px-6 py-3 overflow-hidden">

        {/* Hardware-Accelerated Shine */}
        <motion.div
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute top-0 bottom-0 w-16 bg-white/15 blur-lg rotate-12 will-change-transform"
        />

        {/* Caption Text - Shifted down to a simple CSS pulse loop to prevent CPU recalculations */}
        <p className="relative text-center text-white text-base sm:text-lg font-semibold tracking-wide drop-shadow-md animate-pulse">
          {text}
        </p>
      </div>
    </motion.div>
  );
}