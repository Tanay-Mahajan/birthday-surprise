"use client";

import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.035,
        y: -2,
      }}
      whileTap={{
        scale: .95,
      }}
      onClick={onClick}
      className="
      premium-button
      mt-8 inline-flex items-center justify-center gap-3
      px-8 sm:px-10
      py-3.5 sm:py-4
      rounded-full
      bg-gradient-to-r
      from-pink-500
      via-rose-500
      to-violet-500
      text-white
      text-base sm:text-lg
      font-semibold
      shadow-[0_14px_34px_rgba(219,39,119,.35)]
      ring-1
      ring-white/30
      hover:shadow-[0_18px_50px_rgba(219,39,119,.5)]
      min-h-12
      overflow-hidden
      relative
      "
    >
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
