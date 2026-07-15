"use client";

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
  // Skip rendering the play badge at all for videos — they're muted+autoplay,
  // so there's nothing to "press play" on, and it avoids a flash-then-vanish
  // when onPlay fires late on iOS Safari.
  const [isPlaying, setIsPlaying] = useState(type === "video");

  return (
    <div className="relative w-[88vw] max-w-[360px] sm:max-w-[390px] select-none pointer-events-auto">
      {/* Tape overlay */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-40 w-20 sm:w-24 h-7 sm:h-8 rounded-sm bg-yellow-100/80 border border-white/40 shadow-sm backdrop-blur-sm -rotate-2" />

      {/* Paper container */}
      <div className="relative overflow-hidden rounded-[20px] sm:rounded-[22px] border border-pink-100/60 bg-[#fffef9] p-2.5 sm:p-3 pb-6 sm:pb-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        {/* Subtle paper texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] [background-size:16px_16px]" />

        {/* Media frame */}
        <div className="relative h-[340px] sm:h-[420px] overflow-hidden rounded-xl bg-neutral-900">
          {type === "photo" ? (
            <div className="absolute inset-0 overflow-hidden bg-neutral-900">
              {/*
                Plain <img>, NOT next/image.
                next/image rewrites src to /_next/image?url=... which is a
                different URL than what the parent preloads — the browser
                cache never gets hit and every slide refetches mid-animation.
                Plain <img> uses the exact same src as the preload, so the
                second "load" is served instantly from cache.
              */}
              <img
                src={src}
                alt={hasCaption ? caption : "Memory"}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover md:transition-transform md:duration-[4000ms] md:ease-out md:hover:scale-105"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-black">
              <div className="absolute top-3 left-3 z-30 rounded-full bg-black/70 px-3 py-1 text-[10px] sm:text-[11px] font-bold tracking-wider text-white">
                🎥 VIDEO
              </div>

              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/30"
                  >
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/90 text-xl sm:text-2xl shadow-2xl">
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
                webkit-playsinline="true"
                preload="auto"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onEnded={() => {
                  setIsPlaying(true);
                  if (onVideoEnd) onVideoEnd();
                }}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Gloss glare */}
          {!shouldReduceMotion && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 mix-blend-overlay" />
          )}

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
        </div>

        {/* Caption */}
        {hasCaption && (
          <div className="mt-3 sm:mt-4">
            <p
              className="text-center text-xl sm:text-2xl font-semibold tracking-wide text-gray-700"
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