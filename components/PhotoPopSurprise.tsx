"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhotoCard from "./PhotoCard";

type Memory = {
  type: "photo" | "video";
  src: string;
  caption: string;
};

const memories: Memory[] = [
  { type: "photo", src: "/image2.jpg", caption: "❤️ Beautiful" },
  { type: "photo", src: "/image3.jpg", caption: "❤️ Beautiful" },
  { type: "photo", src: "/image4.jpg", caption: "❤️ Beautiful" },
  { type: "video", src: "/carDriving.mp4", caption: "🎥 A Special Memory" },
  { type: "photo", src: "/image5.jpg", caption: "❤️ Beautiful" },
  { type: "photo", src: "/image6.jpg", caption: "❤️ Beautiful" },
  { type: "photo", src: "/image7.jpg", caption: "❤️ Beautiful" },
  { type: "video", src: "/food.mp4", caption: "🎥 A Special Memory" },
  { type: "photo", src: "/image8.jpg", caption: "❤️ Beautiful" },
  { type: "photo", src: "/image9.jpg", caption: "🥰 Gorgeous" },
  { type: "photo", src: "/image10.jpg", caption: "✨ Stunning" },
  { type: "video", src: "/power.mp4", caption: "🎥 A Special Memory" },
];

const rotations = [-5, 4, -3, 5, -4, 3, -6, 4, -2, 5];

export default function PhotoPopSurprise({
  onComplete
}: {
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [showEnding, setShowEnding] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const isAdvancing = useRef(false);
  const currentMemory = memories[index];

  /* ---------- High Priority Media Preloads ---------- */
  useEffect(() => {
    memories.forEach((item) => {
      if (item.type === "photo") {
        const img = new Image();
        img.src = item.src;
      } else {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = item.src;
        link.as = "video";
        document.head.appendChild(link);
      }
    });
  }, []);

  /* ---------- Autoplay Timer Loop ---------- */
  useEffect(() => {
    if (showEnding || currentMemory.type === "video") return;

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      advanceToNext();
    }, 4000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, showEnding, currentMemory.type]);

  /* ---------- Card Shift Logic ---------- */
  function advanceToNext() {
    if (isAdvancing.current || showEnding) return;
    isAdvancing.current = true;

    if (index >= memories.length - 1) {
      setShowEnding(true);
      return;
    }

    setIndex((prev) => prev + 1);

    setTimeout(() => {
      isAdvancing.current = false;
    }, 400);
  }

  return (
    // Solid gradient base without massive live-rendering filters
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-slate-950 via-neutral-900 to-zinc-950 select-none">

      {/* Decorative Static ambient glow layer (no real-time blur math required) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Container Deck */}
      <div className="relative z-20 rounded-[34px] bg-neutral-900/40 border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-5 backdrop-blur-sm">

        <div
          onClick={advanceToNext}
          className="relative w-[82vw] max-w-[340px] h-[490px] sm:h-[540px] cursor-pointer"
        >
          {/* Deck Paper Base Stack - Matches primary photo card color signature */}
          <div className="absolute inset-0 rounded-[26px] bg-[#fffef9] border border-neutral-200/5 shadow-md z-10 -rotate-6 translate-y-3 scale-95 opacity-80" />
          <div className="absolute inset-0 rounded-[26px] bg-[#fffef9] border border-neutral-200/5 shadow-lg z-20 rotate-3 translate-y-1.5 scale-98 opacity-90" />

          {/* Cards Stack Presentation Core */}
          <AnimatePresence>
            <motion.div
              key={index}
              className="absolute inset-0 z-30 w-full h-full"
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 15,
                rotate: rotations[index] - 3,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: rotations[index],
              }}
              exit={{
                opacity: 0,
                x: 300,
                y: -30,
                rotate: rotations[index] + 12,
                transition: { duration: 0.3, ease: "easeIn" }
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 24,
              }}
            >
              <PhotoCard
                type={currentMemory.type}
                src={currentMemory.src}
                caption={currentMemory.caption}
                rotation={rotations[index]}
                onVideoEnd={advanceToNext}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Prompt Tagline */}
        {!showEnding && (
          <div className="absolute -bottom-16 left-0 right-0 flex flex-col items-center pointer-events-none">
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-3 text-xs tracking-[0.25em] text-neutral-400 font-medium"
            >
              👆 Tap photo or wait...
            </motion.p>
          </div>
        )}
      </div>

      {/* Completion Modal Stage */}
      <AnimatePresence>
        {showEnding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 px-6"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="text-8xl"
            >
              ❤️
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-4xl sm:text-5xl font-bold text-pink-500"
            >
              Beautiful ❤️
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-5 max-w-sm text-center leading-8 text-neutral-400"
            >
              Kuch photos ke liye maar khane ko ready hu... bas zinda chhod dena. 🤣🤗🌸
            </motion.p>

            {onComplete && (
              <motion.button
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onComplete}
                className="mt-12 rounded-full px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 shadow-[0_15px_50px_rgba(236,72,153,0.3)]"
              >
                Continue ❤️
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}