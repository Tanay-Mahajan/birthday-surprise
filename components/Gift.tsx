"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";

type GiftProps = {
  onReveal: () => void;
};

export default function Gift({ onReveal }: GiftProps) {
  const [seconds, setSeconds] = useState(15);
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (finished) return;

    if (seconds === 0) {
      setFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, finished]);

  function revealGift() {
    setShowConfetti(true);

    confetti({
      particleCount: 300,
      spread: 180,
      origin: {
        y: 0.6,
      },
    });

    setTimeout(() => {
      onReveal();
    }, 1500);
  }

  const progress = ((15 - seconds) / 15) * 100;

  return (
    <div className="w-[750px] max-w-full text-center">

      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={350}
        />
      )}

      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl font-bold text-pink-600"
      >
        🎁 Gift Time
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .4 }}
        className="text-3xl mt-8"
      >
        Arree...
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .8 }}
        className="text-4xl mt-4 font-bold"
      >
        Itna Pyaara Sa Friend Hu...
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-4xl mt-3 text-pink-600 font-bold"
      >
        Wahi Gift Hai 😌❤️
      </motion.p>

      {!finished && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-12 text-2xl"
          >
            😂 Mood Off Mat Karo...
          </motion.p>

          <motion.p
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
            className="text-7xl mt-8"
          >
            ⏳
          </motion.p>

          <p className="text-6xl font-bold mt-3">
            {seconds}
          </p>

          <div className="w-full h-5 bg-pink-100 rounded-full mt-10 overflow-hidden">

            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              className="h-full bg-pink-500"
            />

          </div>

          <p className="mt-4 text-gray-600">
            Secret gift is loading...
          </p>
        </>
      )}

      <AnimatePresence>

        {finished && (

          <motion.div
            initial={{ opacity: 0, scale: .5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >

            <h2 className="text-4xl mt-10 font-bold text-pink-600">
              😂 Okay Okay...
            </h2>

            <p className="text-2xl mt-5">
              Ek Secret Gift Hai...
            </p>

            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: .95,
              }}
              onClick={revealGift}
              className="mt-10 px-12 py-5 rounded-full bg-pink-500 text-white text-2xl shadow-xl"
            >
              🎁 Reveal Gift
            </motion.button>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}