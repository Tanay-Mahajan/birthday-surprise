"use client";

import { motion } from "framer-motion";

export default function FinalThankYou() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-fuchsia-950 to-violet-950 px-6 text-center">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl" />
      <div aria-hidden="true" className="star-field opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 130, damping: 16 }}
        className="premium-surface relative max-w-xl rounded-[2rem] border border-white/20 bg-slate-950/45 px-8 py-14 shadow-[0_25px_80px_rgba(190,24,93,.3),inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-xl sm:px-14"
      >
        <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-white/[0.06]" />
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-6xl"
        >
          ♥
        </motion.div>

        <h1 className="mt-7 text-4xl font-bold text-pink-600 sm:text-6xl">
          Thank You
        </h1>
        <p className="mt-5 text-xl font-semibold text-pink-100 sm:text-2xl">
          Happy Birthday once again!
        </p>
        <p className="mt-6 leading-8 text-purple-100/80">
          Wishing you a year filled with love, laughter, and memories worth
          celebrating.
        </p>
        <p className="mt-8 font-semibold text-pink-600">
          With love, Tanay
        </p>
      </motion.div>
    </section>
  );
}
