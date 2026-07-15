"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Props = {
  type?: "photo" | "video";
  src: string;
  caption?: string;
  rotation?: number;
  onVideoEnd?: () => void;
};

const floatTransition = {
  repeat: Infinity,
  duration: 4,
  ease: "easeInOut",
} as const;

export default function PhotoCard({
  type = "photo",
  src,
  caption = "",
  rotation = 0,
  onVideoEnd,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const hasCaption = caption.trim().length > 0;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.article
      aria-label={hasCaption ? caption : "Memory"}
      animate={
        shouldReduceMotion
          ? { rotate: rotation }
          : { y: [0, -5, 0], rotate: rotation }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.25 }
          : { y: floatTransition, rotate: { duration: 0.45 } }
      }
      className="relative w-[88vw] max-w-[360px] sm:max-w-[390px]"
    >
      {/* Shadow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.25 }
            : { opacity: [.18, .28, .18], scale: [1, 1.02, 1] }
        }
        transition={floatTransition}
        className="absolute left-6 right-6 -bottom-5 h-8 rounded-full bg-black/40 blur-xl"
      />

      {/* Premium Tape */}
      <motion.div
        animate={shouldReduceMotion ? { rotate: -3 } : { rotate: [-3, 2, -3] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 -top-4 z-40 w-24 h-8 rounded-sm bg-yellow-100/70 border border-white/40 shadow-md backdrop-blur-md"
      />

      {/* Paper Container */}
      <div className="relative overflow-hidden rounded-[22px] border border-pink-100 bg-[#fffef9] p-3 pb-7 shadow-[0_18px_40px_rgba(0,0,0,.25)]">
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] [background-size:18px_18px]" />

        {/* Media Frame */}
        <div className="relative h-[370px] overflow-hidden rounded-xl bg-gray-100 sm:h-[420px]">
          {type === "photo" ? (
            <motion.div
              animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.05] }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={hasCaption ? caption : "Memory"}
                fill
                priority
                sizes="(max-width:640px) 88vw, 390px"
                className="object-cover select-none"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0">
              {/* Video Badge */}
              <div className="absolute top-3 left-3 z-30 rounded-full bg-black/65 px-3 py-1 text-[11px] font-bold tracking-wider text-white">
                🎥 VIDEO
              </div>

              {/* Play Icon overlay (Fades out gracefully using Framer Motion instead of JS timers) */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.4 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/20"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-4xl shadow-2xl">
                      ▶
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <video
                src={src}
                autoPlay
                muted
                playsInline
                preload="auto"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onEnded={() => {
                  setIsPlaying(false);
                  if (onVideoEnd) onVideoEnd();
                }}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Premium Gloss Glare Effect */}
          {!shouldReduceMotion && (
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "180%" }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-0 bottom-0 w-20 rotate-12 bg-white/20 blur-xl"
            />
          )}

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5" />
        </div>

        {/* Caption */}
        {hasCaption && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-4"
          >
            {/* Note: Recommend mapping 'font-caveat' here if setup via Next Font */}
            <p className="text-center text-xl font-semibold tracking-wide text-gray-700 font-cursive">
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}