"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";

type GiftProps = {
  onReveal: () => void;
};

export default function Gift({ onReveal }: GiftProps) {
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [opening, setOpening] = useState(false);

  // Hidden 10-second timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setFinished(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  function revealGift() {
    setOpening(true);
    setShowConfetti(true);

    confetti({
      particleCount: 350,
      spread: 180,
      origin: {
        y: 0.6,
      },
    });

    setTimeout(() => {
      onReveal();
    }, 1800);
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto text-center">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={400}
        />
      )}

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-5xl font-bold text-pink-600"
      >
        🎁 Your Gift
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-base sm:text-lg text-gray-600"
      >
        Finally... You reached the gift 😄
      </motion.p>

      {/* Intro Stage: Playful banter header visible immediately */}
      {!opening && (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-2xl sm:text-3xl font-bold"
          >
            Arreeee... 😌
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-3 text-lg sm:text-xl"
          >
            Itna Pyaara Sa Friend Hu...
          </motion.p>

          <motion.h2
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-4 text-3xl sm:text-4xl font-bold text-pink-600"
          >
            Wahi Gift Hai ❤️😂
          </motion.h2>
        </>
      )}

      {/* Main Container with dynamic stages */}
      <AnimatePresence mode="wait">
        {/* STAGE 1: Bouncing Box & Preparation Text (Hidden 10s Timer is ticking) */}
        {!finished && !opening && (
          <motion.div
            key="waiting-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-12"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="text-[120px] select-none"
            >
              🎁
            </motion.div>
            <p className="mt-8 text-lg text-gray-600">
              Preparing your surprise...
            </p>
            <p className="mt-2 text-pink-500 italic">
              Please wait a little ❤️
            </p>
          </motion.div>
        )}

        {/* STAGE 2: 10 Seconds Pass -> Shaking Gift & Surprise Sequence */}
        {finished && !opening && (
          <motion.div
            key="reveal-stage"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12"
          >
            <motion.div
              animate={{
                x: [0, -8, 8, -8, 8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                repeatDelay: 2,
              }}
              className="text-[120px] select-none"
            >
              🎁
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-4xl font-bold text-pink-600"
            >
              😂 Gussa Mat Ho...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-5 text-xl text-gray-700"
            >
              Itni bhi expectations mat rakhna 😅
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-3 text-gray-500"
            >
              Gift chhota hai...
              <br />
              Par dil se banaya hai ❤️
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={revealGift}
              className="mt-10 w-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 py-4 text-white text-lg sm:text-xl font-bold shadow-2xl"
            >
              🎁 Reveal My Surprise ❤️
            </motion.button>
          </motion.div>
        )}

        {/* STAGE 3: Box Explodes / Scales out when clicked */}
        {opening && (
          <motion.div
            key="opening-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 0],
                rotate: [0, 20, -20, 0],
              }}
              transition={{ duration: 1.4 }}
              className="text-[120px] select-none"
            >
              💥
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}