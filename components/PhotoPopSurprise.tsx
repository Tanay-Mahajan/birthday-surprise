"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PhotoCard from "./PhotoCard";
import CameraFlash from "./CameraFlash";
import FloatingParticles from "./FloatingParticles";

type Props = {
  onComplete?: () => void;
};

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

export default function PhotoPopSurprise({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const [showEnding, setShowEnding] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const isAdvancing = useRef(false);
  const currentMemory = memories[index];

  // Derive the active background photo safely
  const backgroundImage =
    memories
      .slice(0, index + 1)
      .reverse()
      .find((m) => m.type === "photo")?.src ?? memories[0].src;

  /* ---------- Robust Preloading ---------- */
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

  /* ---------- Auto Timer Loop ---------- */
  useEffect(() => {
    if (showEnding || currentMemory.type === "video") return;

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      advanceToNext(false); // Auto advance doesn't flash
    }, 4000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, showEnding, currentMemory.type]);

  /* ---------- Unified Advance Pipeline ---------- */
  function advanceToNext(triggerFlash = false) {
    if (isAdvancing.current || showEnding) return;
    isAdvancing.current = true;

    if (index >= memories.length - 1) {
      setShowEnding(true);
      return;
    }

    if (triggerFlash) {
      navigator.vibrate?.(35);
      setFlash(true);

      // Sync the index change closely with the flash peek to hide structural pop layout shifts
      setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 60);

      setTimeout(() => {
        setFlash(false);
        isAdvancing.current = false;
      }, 300);
    } else {
      // Clean skip path for videos or autoplay transitions
      setIndex((prev) => prev + 1);
      setTimeout(() => {
        isAdvancing.current = false;
      }, 400);
    }
  }

  function handleManualTap() {
    // If it's a video, let the user tap to skip right past it cleanly
    advanceToNext(currentMemory.type === "photo");
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-950 via-fuchsia-950 to-violet-950">

      {/* Background (Lowered blur radius to eliminate painting drops) */}
      <AnimatePresence mode="wait">
        <motion.img
          key={backgroundImage}
          src={backgroundImage}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover blur-[20px] scale-105 pointer-events-none will-change-[opacity]"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-fuchsia-950/65 to-violet-950/80 pointer-events-none" />

      <FloatingParticles />
      <CameraFlash show={flash} />

      {/* Main Container Wrapper */}
      <div className="relative z-20 rounded-[34px] bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_25px_70px_rgba(236,72,153,0.1)] p-5">

        <div
          onClick={handleManualTap}
          className="relative w-[82vw] max-w-[340px] h-[490px] sm:h-[540px] cursor-pointer select-none"
        >
          {/* Third Stack Deck Paper */}
          <div className="absolute inset-0 rounded-[26px] bg-white border border-pink-100 shadow-xl z-10 -rotate-6 translate-y-4 scale-95 opacity-90" />

          {/* Second Stack Deck Paper */}
          <div className="absolute inset-0 rounded-[26px] bg-white border border-pink-100 shadow-xl z-20 rotate-3 translate-y-2 scale-98 opacity-95" />

          {/* Current Frame Component */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              className="absolute inset-0 z-30"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 60,
                rotate: rotations[index] - 5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: rotations[index],
              }}
              exit={{
                opacity: 0,
                x: 240,
                y: -60,
                rotate: rotations[index] + 15,
              }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 20,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <PhotoCard
                type={currentMemory.type}
                src={currentMemory.src}
                caption={currentMemory.caption}
                rotation={rotations[index]}
                onVideoEnd={() => advanceToNext(false)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Prompt */}
        {!showEnding && (
          <div className="absolute -bottom-16 left-0 right-0 flex flex-col items-center pointer-events-none">
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-3 text-xs tracking-[0.25em] text-pink-500 font-semibold"
            >
              Base tap photo or wait...
            </motion.p>
          </div>
        )}
      </div>

      {/* Final Splash Screen Screen */}
      <AnimatePresence>
        {showEnding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-lg px-6"
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
              className="mt-5 max-w-sm text-center leading-8 text-gray-300"
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
                className="mt-12 rounded-full px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 shadow-[0_15px_50px_rgba(236,72,153,0.35)]"
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