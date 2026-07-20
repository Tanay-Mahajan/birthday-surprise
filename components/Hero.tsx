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

const chapterLabels = ["For you", "Memories", "A choice", "Wait…", "My letter", "Your gift", "One last thing", "Always"];

export default function Hero() {
  const [page, setPage] = useState(0);
  const isFullBleed = page === 1 || page === 7;

  return (
    <main className="birthday-shell relative min-h-[100dvh] w-full overflow-x-hidden">
      <BackgroundMusic />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="star-field" />
        <Petals />
        <FloatingHearts />
        <FloatingBalloons />
        <Sparkles />
      </div>

      {page > 0 && page < 7 && (
        <div className="journey-progress fixed left-4 right-20 top-4 z-40 sm:left-1/2 sm:right-auto sm:w-[420px] sm:-translate-x-1/2" aria-label={`Chapter ${page + 1} of 8: ${chapterLabels[page]}`}>
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-100/70">
            <span>{chapterLabels[page]}</span>
            <span>{page + 1} / 8</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-violet-400"
              animate={{ width: `${((page + 1) / 8) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
            />
          </div>
        </div>
      )}

      {isFullBleed ? (
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[100dvh] w-full">
            {page === 1 ? <PhotoPopSurprise onComplete={() => setPage(2)} /> : <FinalThankYou />}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="relative z-20 flex min-h-[100dvh] items-center justify-center px-3 py-16 sm:px-6 sm:py-20">
          <GlassCard>
            <AnimatePresence mode="wait">
              {page === 0 && (
                <motion.div key="home" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.65 }} className="text-center">
                  <div className="mx-auto mb-5 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-rose-200/75 sm:mb-7 sm:gap-3 sm:text-[10px] sm:tracking-[0.35em]">
                    <span className="h-px w-8 bg-rose-200/35" />
                    July 20 · just for you
                    <span className="h-px w-8 bg-rose-200/35" />
                  </div>

                  <motion.div animate={{ y: [0, -7, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }} className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-4xl shadow-[0_18px_50px_rgba(244,114,182,.22)] sm:h-24 sm:w-24 sm:text-5xl">
                    <span className="absolute inset-2 rounded-full border border-dashed border-rose-200/20" />
                    🎂
                  </motion.div>

                  <p className="mt-5 font-handwritten text-3xl text-rose-200 sm:mt-7 sm:text-4xl">A little corner of the universe</p>
                  <h1 className="mt-1 text-balance text-[2.5rem] font-bold leading-[1.02] text-white sm:mt-2 sm:text-6xl">
                    Made only to make
                    <span className="block bg-gradient-to-r from-rose-200 via-pink-300 to-violet-300 bg-clip-text text-transparent">you smile.</span>
                  </h1>
                  <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-purple-100/75 sm:mt-6 sm:text-base sm:leading-7">
                    Photos, tiny memories, one very honest letter—and a surprise waiting at the end. Take your time with it. ❤️
                  </p>

                  <div className="mt-2 flex justify-center">
                    <AnimatedButton onClick={() => setPage(1)}>Begin your story <span aria-hidden="true">→</span></AnimatedButton>
                  </div>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-white/35">Best enjoyed with sound on</p>
                </motion.div>
              )}

              {page === 2 && <motion.div key="choice" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Choice onLetter={() => setPage(4)} onGift={() => setPage(3)} /></motion.div>}
              {page === 3 && <motion.div key="blocked" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><GiftBlocked onContinue={() => setPage(4)} /></motion.div>}
              {page === 4 && <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Letter onContinue={() => setPage(5)} /></motion.div>}
              {page === 5 && <motion.div key="gift" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Gift onReveal={() => setPage(6)} /></motion.div>}
              {page === 6 && (
                <motion.div key="final" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                  <p className="font-handwritten text-3xl text-rose-200">One last little thing…</p>
                  <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Your real gift ❤️</h1>
                  <p className="mt-4 text-sm text-purple-100/70 sm:text-base">Press play. I saved the best moment for last.</p>
                  <div className="mt-7 overflow-hidden rounded-[24px] border border-white/15 bg-black/30 p-1.5 shadow-[0_25px_60px_rgba(0,0,0,.45)]">
                    <video controls autoPlay playsInline onEnded={() => setPage(7)} className="max-h-[48dvh] w-full rounded-[19px] object-contain sm:max-h-[52vh]"><source src="/reel.mp4" /></video>
                  </div>
                  <button onClick={() => setPage(7)} className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200/70 hover:text-rose-100">Continue after the video →</button>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      )}
    </main>
  );
}
