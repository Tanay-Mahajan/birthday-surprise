"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AnimatedButton from "./AnimatedButton";
import BackgroundMusic from "./BackgroundMusic";
import Choice from "./Choice";
import FinalThankYou from "./FinalThankYou";
import FloatingBalloons from "./FloatingBalloons";
import FloatingHearts from "./FloatingHearts";
import Gift from "./Gift";
import GiftBlocked from "./GiftBlocked";
import GlassCard from "./GlassCard";
import Letter from "./Letter";
import Petals from "./Petals";
import PhotoPopSurprise from "./PhotoPopSurprise";
import Sparkles from "./Sparkles";

export default function Hero() {
  const [page, setPage] = useState(0);
  const isFullBleed = page === 1 || page === 4 || page === 7;

  return (
    <main className="birthday-shell relative min-h-[100dvh] w-full overflow-x-hidden">
      <BackgroundMusic page={page} />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="star-field" />
        <Petals />
        <FloatingHearts />
        <FloatingBalloons />
        <Sparkles />
      </div>

      {isFullBleed ? (
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-20 min-h-[100dvh] w-full">
            {page === 1 && <PhotoPopSurprise onComplete={() => setPage(2)} />}
            {page === 4 && (
              <div className="flex min-h-[100dvh] w-full items-center justify-center overflow-x-hidden px-4 py-16">
                <Letter onContinue={() => setPage(5)} />
              </div>
            )}
            {page === 7 && <FinalThankYou />}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="relative z-20 flex min-h-[100dvh] items-center justify-center px-3 py-16 sm:px-6 sm:py-20">
          <GlassCard>
            <AnimatePresence mode="wait">
              {page === 0 && (
                <motion.div key="home" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.65 }} className="text-center">
                  <motion.div animate={{ y: [0, -7, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }} className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-4xl shadow-[0_18px_50px_rgba(244,114,182,.22)] sm:h-24 sm:w-24 sm:text-5xl">
                    <span className="absolute inset-2 rounded-full border border-dashed border-rose-200/20" />
                    🎂
                  </motion.div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300">A Little Surprise</p>
                  <h1 className="mt-3 text-balance text-[2.6rem] font-bold leading-tight text-white sm:text-5xl">Hey Cutie ❤️</h1>
                  <p className="mt-5 text-lg text-purple-100/85 sm:text-xl">Today is our birthday 🎉</p>
                  <p className="mt-2 text-sm text-purple-100/60 sm:text-base">A small website, just to make you smile ✨</p>

                  <div className="mt-2 flex justify-center">
                    <AnimatedButton onClick={() => setPage(1)}>Begin your story <span aria-hidden="true">→</span></AnimatedButton>
                  </div>
                </motion.div>
              )}

              {page === 2 && <motion.div key="choice" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Choice onLetter={() => setPage(4)} onGift={() => setPage(3)} /></motion.div>}
              {page === 3 && <motion.div key="blocked" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><GiftBlocked onContinue={() => setPage(4)} /></motion.div>}
              {page === 5 && <motion.div key="gift" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Gift onReveal={() => setPage(6)} /></motion.div>}
              {page === 6 && (
                <motion.div key="final" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                  <p className="font-handwritten text-3xl text-rose-200">One last little thing…</p>
                  <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Your real gift ❤️</h1>
                  <div className="mt-7 overflow-hidden rounded-[24px] border border-white/15 bg-black/30 p-1.5 shadow-[0_25px_60px_rgba(0,0,0,.45)]">
                    <video controls autoPlay playsInline onEnded={() => setPage(7)} className="max-h-[48dvh] w-full rounded-[19px] object-contain sm:max-h-[52vh]"><source src="/reel.mp4" /></video>
                  </div>
                  <p className="mt-6 text-sm font-medium text-rose-200/70">Made with ❤️ by Tanay</p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      )}
    </main>
  );
}
