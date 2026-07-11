"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  caption?: string;
  rotation?: number;
};

const floatTransition = {
  repeat: Infinity,
  duration: 4,
  ease: "easeInOut",
} as const;

export default function PhotoCard({
  src,
  caption = "",
  rotation = 0,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const hasCaption = caption.trim().length > 0;

  return (
    <motion.article
      aria-label={hasCaption ? caption : "Photo memory"}
      animate={
        shouldReduceMotion
          ? { rotate: rotation }
          : { y: [0, -6, 0], rotate: rotation }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.2 }
          : { y: floatTransition, rotate: { duration: 0.6 } }
      }
      className="relative w-[88vw] max-w-[360px] sm:max-w-[390px]"
    >
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? { opacity: 0.3, scale: 1 }
            : { scale: [1, 1.04, 1], opacity: [0.28, 0.38, 0.28] }
        }
        transition={floatTransition}
        className="absolute right-5 -bottom-6 left-5 h-10 rounded-full bg-black blur-2xl"
      />

      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? { rotate: -3 } : { rotate: [-3, 2, -3] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -top-4 left-1/2 z-30 h-8 w-24 -translate-x-1/2 rounded-sm border border-white/30 bg-yellow-100/60 shadow-md backdrop-blur-sm"
      />

      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-[#fffefb] p-3 pb-7 shadow-[0_25px_70px_rgba(0,0,0,.45)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] [background-size:14px_14px]"
        />

        <div className="relative h-[370px] overflow-hidden rounded-md bg-gray-100 sm:h-[420px]">
          <motion.div
            animate={
              shouldReduceMotion
                ? { scale: 1 }
                : { scale: [1, 1.06, 1.08], x: [0, -6, 4], y: [0, -4, 3] }
            }
            transition={shouldReduceMotion ? { duration: 0.2 } : { duration: 7, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={hasCaption ? caption : "A birthday memory"}
              fill
              loading="eager"
              sizes="(max-width: 640px) 88vw, 390px"
              className="object-cover"
            />
          </motion.div>

          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ x: "-140%" }}
              animate={{ x: "180%" }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="absolute top-0 bottom-0 w-20 rotate-12 bg-white/25 blur-xl"
            />
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5"
          />
        </div>

        {hasCaption && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
            className="mt-3"
          >
            <p
              className="text-center text-lg font-semibold tracking-wide text-gray-700 [font-family:Caveat,cursive]"
              style={{ color: "#374151" }}
            >
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
