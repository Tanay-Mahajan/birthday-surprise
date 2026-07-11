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
        className="text-3xl sm:text-4xl font-bold text-pink-600"
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

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">

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
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border
            border-pink-200/30
            shadow-xl
            p-6
            transition-all
            order-2
          "
        >

          <motion.div
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="text-6xl"
          >
            💌
          </motion.div>

          <h3 className="mt-5 text-2xl font-bold text-pink-600">
            Letter
          </h3>

          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Read a heartfelt birthday message first.
          </p>

          <button
            className="
              mt-6
              w-full
              rounded-full
              bg-pink-500
              text-white
              py-3
              font-semibold
              hover:bg-pink-600
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
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border
            border-pink-200/30
            shadow-xl
            p-6
            transition-all
            order-1
          "
        >

          <motion.div
            animate={{
              rotate: [-8, 8, -8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="text-6xl"
          >
            🎁
          </motion.div>

          <h3 className="mt-5 text-2xl font-bold text-pink-600">
            Gift
          </h3>

          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Curious? Let's see what's inside...
          </p>

          <button
            className="
              mt-6
              w-full
              rounded-full
              bg-purple-500
              text-white
              py-3
              font-semibold
              hover:bg-purple-600
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
        💡 Hint: One of these choices might make the other even more special...
      </motion.p>

    </div>
  );
}
