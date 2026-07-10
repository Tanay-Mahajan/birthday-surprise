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
        pulse-glow

        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-2xl

        mx-auto

        rounded-[30px]

        px-5
        py-8

        sm:px-8
        sm:py-10

        shadow-2xl

        text-center

        relative

        overflow-visible
      "
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
          bg-pink-300/20
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
          bg-rose-300/20
          blur-3xl
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}