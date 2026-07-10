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

  // Hidden 10-second timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setFinished(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  function revealGift() {
    setShowConfetti(true);

    // Instant fullscreen confetti burst
    confetti({
      particleCount: 350,
      spread: 180,
      origin: {
        y: 0.6,
      },
    });

    // Go straight to the Reel surprise immediately
    onReveal();
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto text-center px-4">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={400}
        />
      )}

      {/* Main Container with streamlined stages */}
      <AnimatePresence mode="wait">
        {/* STAGE 1: Pure immediate landing state with bouncing image1.png */}
        {!finished && (
          <motion.div
            key="waiting-stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex flex-col items-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              Arreeee... 😌
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-gray-700">
              Itna Pyaara Sa Friend Hu...
            </p>

            <motion.h2
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-3 text-3xl sm:text-4xl font-bold text-pink-600"
            >
              Wahi Gift Hai ❤️😂
            </motion.h2>

            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-48 h-48 sm:w-56 sm:h-56 select-none mt-8"
            >
              <img
                src="/image1.jpg"
                alt="Surprise Preview"
                className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white"
              />
            </motion.div>

            <p className="mt-8 text-lg font-medium text-gray-600">
              Preparing your surprise...
            </p>
            <p className="mt-2 text-pink-500 italic">
              Please wait a little ❤️
            </p>
          </motion.div>
        )}

        {/* STAGE 2: 10 Seconds Pass -> Straight to shaking box and Real Gift reveal */}
        {finished && (
          <motion.div
            key="reveal-stage"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 flex flex-col items-center"
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
              className="text-[120px] select-none leading-none"
            >
              🎁
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-4xl font-bold text-pink-600"
            >
              😂 Gussa Mat Ho...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-5 text-xl text-gray-700"
            >
              Itni bhi expectations mat rakhna 😅
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-3 text-gray-500 font-medium"
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
      </AnimatePresence>
    </div>
  );
}