"use client";

import { useState } from "react";

import GlassCard from "./GlassCard";
import AnimatedButton from "./AnimatedButton";

import FloatingHearts from "./FloatingHearts";
import FloatingBalloons from "./FloatingBalloons";
import Sparkles from "./Sparkles";
import Petals from "./Petals";
import BackgroundMusic from "./BackgroundMusic";

import Choice from "./Choice";
import GiftBlocked from "./GiftBlocked";
import Letter from "./Letter";
import Gift from "./Gift";
import PhotoPopSurprise from "./PhotoPopSurprise"; // Integrated your photo component here

import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [page, setPage] = useState(0);

  return (
    <main
      className="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      px-4
      py-6
      relative
      overflow-hidden
      "
    >
      <BackgroundMusic />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Petals />
        <FloatingHearts />
        <FloatingBalloons />
        <Sparkles />
      </div>

      {/* Conditionally bypass GlassCard styling for the full-screen interactive photo pop-up experience */}
      {page === 1 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="photo-pop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <PhotoPopSurprise onComplete={() => setPage(2)} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="relative z-20">
          <GlassCard>
            <AnimatePresence mode="wait">
              {/* ---------------- PAGE 0 ---------------- */}
              {page === 0 && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl"
                  >
                    🎂
                  </motion.div>
                  <h2 className="mt-6 text-pink-500 uppercase tracking-[6px] text-sm">
                    A Little Surprise
                  </h2>
                  <h1 className="mt-4 font-bold leading-tight text-4xl sm:text-5xl">
                    Hey Cutie ❤️
                  </h1>
                  <p className="mt-6 text-lg sm:text-xl text-gray-700">
                    Today is your Birthday 🎉
                  </p>
                  <p className="mt-3 text-gray-500 text-sm sm:text-base">
                    Someone spent a lot of time making this just to make you smile ✨
                  </p>
                  <div className="mt-10 flex justify-center">
                    <AnimatedButton onClick={() => setPage(1)}>
                      Tap To Begin 💖
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}

              {/* ---------------- PAGE 2 (Shifted from Page 1) ---------------- */}
              {page === 2 && (
                <motion.div
                  key="choice"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Choice
                    onLetter={() => setPage(4)}
                    onGift={() => setPage(3)}
                  />
                </motion.div>
              )}

              {/* ---------------- PAGE 3 (Shifted from Page 2) ---------------- */}
              {page === 3 && (
                <motion.div
                  key="blocked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GiftBlocked onContinue={() => setPage(4)} />
                </motion.div>
              )}

              {/* ---------------- PAGE 4 (Shifted from Page 3) ---------------- */}
              {page === 4 && (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Letter onContinue={() => setPage(5)} />
                </motion.div>
              )}

              {/* ---------------- PAGE 5 (Shifted from Page 4) ---------------- */}
              {page === 5 && (
                <motion.div
                  key="gift"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Gift onReveal={() => setPage(6)} />
                </motion.div>
              )}

              {/* ---------------- PAGE 6 (Final Reel Video Page) ---------------- */}
              {page === 6 && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-6xl"
                  >
                    🎉
                  </motion.div>
                  <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-pink-600">
                    Happy Birthday ❤️
                  </h1>
                  <p className="mt-5 text-lg text-gray-600">
                    Here's your real gift 🎁
                  </p>
                  <div className="mt-8">
                    <video
                      controls
                      autoPlay
                      playsInline
                      className="w-full rounded-3xl shadow-2xl"
                    >
                      <source src="/reel.mp4" />
                    </video>
                  </div>
                  <p className="mt-8 text-base text-gray-500">
                    Made with ❤️ by Tanay
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      )}
    </main>
  );
}