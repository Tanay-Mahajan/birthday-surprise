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
  { type: "photo", src: "/image6.jpg", caption: "❤️ Beautiful" },
  { type: "photo", src: "/image7.jpg", caption: "❤️ Beautiful" },
  { type: "video", src: "/food.mp4", caption: "🎥 A Special Memory" },
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

  /* ---------- Media Preloads Pipeline ---------- */
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

  /* ---------- Navigation Cycle ---------- */
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
    }, 500);
  }

  return (
    // Beautiful, Rich Luxury Velvet Amethyst Backdrop
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-slate-950 via-purple-950/60 to-rose-950/40 select-none">

      {/* Dynamic hardware-accelerated fluid atmospheric ambient lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[8000ms]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.03)_0%,transparent_65%)] pointer-events-none" />

      {/* Floating Ambient Shadow Base (Gives premium perspective depth) */}
      <div className="absolute w-[320px] h-[30px] rounded-full bg-black/45 blur-2xl bottom-12 left-1/2 -translate-x-1/2 z-10 scale-95" />

      {/* Glass Frame Deck Box Container */}
      <div className="relative z-20 rounded-[34px] bg-white/[0.03] border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.65)] p-6 backdrop-blur-md">

        {/* Interaction Wrapper Zone */}
        <div
          onClick={advanceToNext}
          className="relative w-[82vw] max-w-[340px] h-[490px] sm:h-[540px] cursor-pointer"
        >
          {/* Deck Paper Base Stack - Soft tint hues */}
          <div className="absolute inset-0 rounded-[26px] bg-[#fbfaf5] border border-neutral-200/5 shadow-md z-10 -rotate-6 translate-y-3 scale-95 opacity-80" />
          <div className="absolute inset-0 rounded-[26px] bg-[#fbfaf5] border border-neutral-200/5 shadow-lg z-20 rotate-3 translate-y-1.5 scale-98 opacity-90" />

          {/* High-Performance Smooth Animation Node */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              className="absolute inset-0 z-30 w-full h-full"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
                rotate: rotations[index] - 2,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: rotations[index],
              }}
              exit={{
                opacity: 0,
                x: 320,
                y: -40,
                rotate: rotations[index] + 14,
                transition: { duration: 0.35, ease: "easeIn" }
              }}
              transition={{
                type: "spring",
                stiffness: 170,
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

        {/* Action Prompt Banner */}
        {!showEnding && (
          <div className="absolute -bottom-16 left-0 right-0 flex flex-col items-center pointer-events-none">
            <motion.p
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="mt-3 text-xs tracking-[0.25em] text-rose-300/70 font-semibold"
            >
              ✨ TAP PHOTO OR WAIT...
            </motion.p>
          </div>
        )}
      </div>

      {/* Luxury Splash Ending Overlay Modal */}
      <AnimatePresence>
        {showEnding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl px-6"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="text-8xl filter drop-shadow-[0_10px_20px_rgba(244,63,94,0.3)] animate-bounce duration-[2000ms]"
            >
              ❤️
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 text-center"
            >
              Beautiful ❤️
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-5 max-w-sm text-center text-lg leading-8 text-neutral-300 font-medium"
            >
              Kuch photos ke liye maar khane ko ready hu... bas zinda chhod dena. 🤣🤗🌸
            </motion.p>

            {onComplete && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onComplete}
                className="mt-12 rounded-full px-14 py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 shadow-[0_15px_45px_rgba(236,72,153,0.4)] transition-all duration-300 hover:shadow-[0_15px_60px_rgba(236,72,153,0.6)]"
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