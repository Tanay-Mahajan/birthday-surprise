"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function GlassCard({ children }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        glass
        glow
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-3xl

        mx-auto

        rounded-[38px]

        px-5
        py-7

        sm:px-8
        sm:py-10

        shadow-[0_28px_85px_rgba(136,19,87,.22)]

        text-center

        relative

        overflow-hidden
      "
      style={{ width: "min(calc(100vw - 24px), 768px)" }}
    >
      {/* Decorative Glow */}

      <div
        className="
          absolute
          -top-24
          -right-20
          w-48
          h-48
          rounded-full
          bg-fuchsia-300/35
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-20
          -left-20
          w-52
          h-52
          rounded-full
          bg-violet-300/30
          blur-3xl
        "
      />

      <div className="pointer-events-none absolute inset-0 rounded-[38px] bg-gradient-to-br from-white/10 via-transparent to-pink-200/5" />
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
