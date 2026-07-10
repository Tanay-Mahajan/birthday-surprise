"use client";

import { motion } from "framer-motion";

export default function GlassCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="
        glass
        w-[95%]
        max-w-3xl
        mx-auto
        p-6
        sm:p-8
        md:p-10
      "
    >
      {children}
    </motion.div>
  );
}