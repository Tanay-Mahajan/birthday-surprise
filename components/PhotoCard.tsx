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
    <div className="relative w-[88vw] max-w-[360px] sm:max-w-[390px] select-none pointer-events-auto">
      {/* Premium Tape Overlay */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-40 w-24 h-8 rounded-sm bg-yellow-100/80 border border-white/40 shadow-sm backdrop-blur-sm -rotate-2" />

      {/* Paper Container */}
      <div className="relative overflow-hidden rounded-[22px] border border-pink-100/60 bg-[#fffef9] p-3 pb-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        {/* Subtle Paper Texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] [background-size:16px_16px]" />

        {/* Media Frame Container */}
        <div className="relative h-[370px] overflow-hidden rounded-xl bg-neutral-900 sm:h-[420px]">
          {type === "photo" ? (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={src}
                alt={hasCaption ? caption : "Memory"}
                fill
                priority
                sizes="(max-width:640px) 88vw, 390px"
                className="object-cover transition-transform duration-[4000ms] ease-out scale-100 hover:scale-105"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black">
              {/* Video Badge */}
              <div className="absolute top-3 left-3 z-30 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold tracking-wider text-white">
                🎥 VIDEO
              </div>

              {/* Play Icon Indicator Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/30"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl shadow-2xl">
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

          {/* Premium Gloss Glare reflection */}
          {!shouldReduceMotion && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 mix-blend-overlay" />
          )}

          {/* Vignette Shadow Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
        </div>

        {/* Cursive Handwriting Caption */}
        {hasCaption && (
          <div className="mt-4">
            <p
              className="text-center text-2xl font-semibold tracking-wide text-gray-700"
              style={{ fontFamily: "Caveat, cursive" }}
            >
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}