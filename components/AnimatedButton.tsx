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
        scale: 1.08,
        rotate: -2,
      }}
      whileTap={{
        scale: .95,
      }}
      onClick={onClick}
      className="
      mt-8
      px-10
      py-4
      rounded-full
      bg-gradient-to-r
      from-pink-500
      via-rose-500
      to-violet-500
      text-white
      text-xl
      font-semibold
      shadow-[0_14px_34px_rgba(219,39,119,.35)]
      ring-1
      ring-white/60
      "
    >
      {children}
    </motion.button>
  );
}
