"use client";

import { motion } from "framer-motion";

type Props = {
  onLetter: () => void;
  onGift: () => void;
};

export default function Choice({ onLetter, onGift }: Props) {
  return (
    <div className="w-full text-center">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-200 to-violet-200 drop-shadow-[0_8px_24px_rgba(244,114,182,.18)]"
      >
        🎉 Your Surprise Awaits
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-gray-600 text-base sm:text-lg"
      >
        Which one would you like to open first?
      </motion.p>

      <div className="mt-7 grid grid-cols-1 sm:mt-10 sm:grid-cols-2 gap-4 sm:gap-5">

        {/* Letter Card */}

        <motion.div
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={onLetter}
          className="
            cursor-pointer
            premium-choice-card
            rounded-[26px]
            bg-white/[0.08]
            backdrop-blur-xl
            border
            border-pink-200/25
            shadow-[0_18px_48px_rgba(0,0,0,.22)]
            p-4 sm:p-6
            transition-all
            order-2
            relative
            overflow-hidden
          "
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />

          <motion.div
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-pink-300/10 text-5xl shadow-[0_14px_34px_rgba(244,114,182,.18)] sm:h-24 sm:w-24 sm:text-6xl"
          >
            💌
          </motion.div>

          <h3 className="mt-3 text-xl font-bold text-pink-300 sm:mt-5 sm:text-2xl">
            Letter
          </h3>

          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Read a heartfelt birthday message.
          </p>

          <button
            className="
              mt-4 sm:mt-6
              w-full
              rounded-full
              bg-gradient-to-r from-pink-500 to-rose-500
              text-white
              py-3
              font-semibold
              shadow-[0_12px_28px_rgba(236,72,153,.28)]
            "
          >
            Open Letter ❤️
          </button>

        </motion.div>

        {/* Gift Card */}

        <motion.div
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={onGift}
          className="
            cursor-pointer
            premium-choice-card
            rounded-[26px]
            bg-white/[0.08]
            backdrop-blur-xl
            border
            border-pink-200/25
            shadow-[0_18px_48px_rgba(0,0,0,.22)]
            p-4 sm:p-6
            transition-all
            order-1
            relative
            overflow-hidden
          "
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />

          <motion.div
            animate={{
              rotate: [-8, 8, -8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-violet-300/10 text-5xl shadow-[0_14px_34px_rgba(167,139,250,.18)] sm:h-24 sm:w-24 sm:text-6xl"
          >
            🎁
          </motion.div>

          <h3 className="mt-3 text-xl font-bold text-violet-300 sm:mt-5 sm:text-2xl">
            Gift
          </h3>

          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Curious? Let&apos;s see what&apos;s inside…
          </p>

          <button
            className="
              mt-4 sm:mt-6
              w-full
              rounded-full
              bg-gradient-to-r from-violet-500 to-fuchsia-500
              text-white
              py-3
              font-semibold
              shadow-[0_12px_28px_rgba(168,85,247,.28)]
            "
          >
            Open Gift 🎀
          </button>

        </motion.div>

      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-sm text-gray-500 italic"
      >
      </motion.p>

    </div>
  );
}
