"use client";

import { motion } from "framer-motion";

type Props = {
  onContinue: () => void;
};

export default function GiftBlocked({ onContinue }: Props) {
  return (
    <div className="w-full max-w-md mx-auto text-center">

      {/* Animated Gift */}

      <motion.div
        animate={{
          rotate: [-8, 8, -8, 8, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="text-7xl"
      >
        🎁
      </motion.div>

      <motion.h1
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          mt-6
          text-3xl
          sm:text-4xl
          font-bold
          text-pink-600
        "
      >
        Arreee 😂
      </motion.h1>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .3,
        }}
        className="
          mt-5
          text-lg
          sm:text-xl
          text-gray-700
        "
      >
        Itni bhi kya jaldi hai Gift kholne ki?
      </motion.p>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .8,
        }}
        className="
          mt-4
          text-base
          sm:text-lg
          text-gray-500
          leading-7
        "
      >
        Pehle meri mehnat se likha hua
        <br />
        birthday letter toh padh lo...
        ❤️
      </motion.p>

      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
        }}
        className="mt-8 text-5xl"
      >
        💌
      </motion.div>

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={onContinue}
        className="
          mt-10
          w-full
          rounded-full
          bg-gradient-to-r
          from-pink-500
          to-rose-500
          text-white
          py-4
          text-lg
          font-bold
          shadow-xl
        "
      >
        📖 Okay... I'll Read The Letter
      </motion.button>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.5,
        }}
        className="
          mt-6
          text-sm
          italic
          text-pink-500
        "
      >
        Trust me... it's worth reading first ✨
      </motion.p>

    </div>
  );
}