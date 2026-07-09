"use client";

import { motion } from "framer-motion";

type Props = {
  onLetter: () => void;
  onGift: () => void;
};

export default function Choice({ onLetter, onGift }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center"
    >
      <h1 className="text-5xl font-bold text-pink-600">
        What do you want first? 💖
      </h1>

      <p className="mt-4 text-gray-600 text-lg">
        Choose one...
      </p>

      <div className="flex gap-8 mt-12">

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          onClick={onLetter}
          className="bg-pink-500 text-white px-10 py-5 rounded-3xl text-2xl shadow-xl"
        >
          💌 Letter
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          onClick={onGift}
          className="bg-purple-500 text-white px-10 py-5 rounded-3xl text-2xl shadow-xl"
        >
          🎁 Gift
        </motion.button>

      </div>

    </motion.div>
  );
}