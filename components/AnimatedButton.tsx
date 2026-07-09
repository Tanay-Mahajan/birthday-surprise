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
      bg-pink-500
      text-white
      text-xl
      font-semibold
      shadow-xl
      "
    >
      {children}
    </motion.button>
  );
}