"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhotoCard from "./PhotoCard";

type Memory = {
  type: "photo" | "video";
  src: string;
  caption: string;
};

const memories: Memory[] = [
  { type: "photo", src: "/image2.jpg", caption: "✨ Stunning" },
  { type: "photo", src: "/image3.jpg", caption: "🥰 Gorgeous" },
  { type: "photo", src: "/image4.jpg", caption: "Hoye Oye! 😍" },
  { type: "video", src: "/carDriving.mp4", caption: "Pro Driving 🚗" },
  { type: "photo", src: "/image6.jpg", caption: "Innocent-ish 😇" },
  { type: "video", src: "/food.mp4", caption: "Thinkaholic 🤯" },
  { type: "photo", src: "/image8.jpg", caption: "BusyBee 🐝" },
  { type: "photo", src: "/image9.jpg", caption: "ShortFuse 😤" },
  { type: "photo", src: "/image10.jpg", caption: "PretendGrin 😬" },
  { type: "video", src: "/power.mp4", caption: "Powerpuff 💪✨" },
];

const rotations = [-3, 2, -2, 3, -2.5, 2, -3, 2.5, -1.5, 3];
const PHOTO_CHANGE_DELAY_MS = 5000;

export default function PhotoPopSurprise({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [showEnding, setShowEnding] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isAdvancing = useRef(false);

  // Keep real references alive so the browser can't cancel/GC preloads mid-fetch
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const preloadedLinks = useRef<HTMLLinkElement[]>([]);

  const currentMemory = memories[index];

  /* ---------- Media Preload Pipeline ---------- */
  useEffect(() => {
    memories.forEach((item) => {
      if (item.type === "photo") {
        // Plain <img> preload — must match the plain <img> src used in PhotoCard
        // (this is why we don't use next/image there: URLs must match to hit cache)
        const img = new window.Image();
        img.decoding = "async";
        img.src = item.src;
        preloadedImages.current.push(img);
      } else {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = item.src;
        link.as = "video";
        document.head.appendChild(link);
        preloadedLinks.current.push(link);
      }
    });

    return () => {
      preloadedLinks.current.forEach((l) => l.remove());
      preloadedLinks.current = [];
      preloadedImages.current = [];
    };
  }, []);

  /* ---------- Autoplay Timer Loop ---------- */
  useEffect(() => {
    if (showEnding || currentMemory.type === "video") return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      advanceToNext();
    }, PHOTO_CHANGE_DELAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, showEnding, currentMemory.type]);

  /* ---------- Navigation Cycle ---------- */
  function advanceToNext() {
    if (isAdvancing.current || showEnding) return;
    isAdvancing.current = true;

    if (index >= memories.length - 1) {
      setShowEnding(true);
      isAdvancing.current = false;
      return;
    }
    setIndex((prev) => prev + 1);
    setTimeout(() => {
      isAdvancing.current = false;
    }, 500);
  }

  function continueToChoice() {
    if (!onComplete || leaving) return;
    setLeaving(true);
    window.setTimeout(onComplete, 500);
  }

  return (
    <div
      className="relative min-h-[100dvh] min-h-screen overflow-hidden flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-slate-950 via-purple-950/60 to-rose-950/40 select-none [-webkit-tap-highlight-color:transparent]"
    >
      {/* Ambient light blobs — GPU-composited, won't fight the card's blur for paint time */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-500/10 blur-[90px] pointer-events-none mix-blend-screen animate-pulse duration-[6000ms] [will-change:opacity] [transform:translateZ(0)]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none mix-blend-screen animate-pulse duration-[8000ms] [will-change:opacity] [transform:translateZ(0)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.03)_0%,transparent_65%)] pointer-events-none" />

      {/* Floating ambient shadow */}
      <div className="absolute w-[280px] sm:w-[320px] h-[26px] sm:h-[30px] rounded-full bg-black/45 blur-2xl bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 scale-95" />

      {/* Glass frame deck box */}
      <div className="relative z-20 rounded-[28px] sm:rounded-[34px] bg-white/[0.03] border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.65)] p-4 sm:p-6 backdrop-blur-md">
        <div
          onClick={advanceToNext}
          className="relative w-[86vw] max-w-[340px] h-[65vh] max-h-[540px] min-h-[420px] cursor-pointer [-webkit-tap-highlight-color:transparent]"
        >
          {/* Deck paper base stack */}
          <div className="absolute inset-x-2 top-2 z-10 h-[430px] -rotate-2 rounded-[24px] border border-pink-100/30 bg-[#eee7e5] shadow-md opacity-90 sm:h-[520px] sm:rounded-[26px]" />
          <div className="absolute inset-x-1 top-1 z-20 h-[423px] rotate-[1.25deg] rounded-[24px] border border-pink-100/40 bg-[#faf4f1] shadow-lg opacity-95 sm:h-[513px] sm:rounded-[26px]" />

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${currentMemory.src}-${index}`}
              className="absolute inset-0 z-30 w-full h-full [will-change:transform,opacity]"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
                rotate: rotations[index] - 2,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: rotations[index],
              }}
              exit={{
                opacity: 0,
                x: 220,
                y: -30,
                rotate: rotations[index] + 14,
                transition: { duration: 0.32, ease: "easeIn" },
              }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 24,
              }}
            >
              <PhotoCard
                type={currentMemory.type}
                src={currentMemory.src}
                caption={currentMemory.caption}
                rotation={rotations[index]}
                onVideoEnd={advanceToNext}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {!showEnding && (
          <div className="absolute -bottom-14 sm:-bottom-16 left-0 right-0 flex flex-col items-center pointer-events-none">
            <motion.p
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="mt-3 text-[10px] sm:text-xs tracking-[0.25em] text-rose-300/70 font-semibold text-center px-4"
            >
              ✨ TAP PHOTO OR WAIT...
            </motion.p>
          </div>
        )}
      </div>

      {/* Ending overlay */}
     <AnimatePresence>
       {showEnding && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.3 }}
           exit={{ opacity: 0 }}
           className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl px-5"
         >
           {/* Ambient glow behind the card, echoes the page background */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[480px] max-h-[480px] rounded-full bg-rose-500/10 blur-3xl pointer-events-none [transform:translateZ(0)]" />

           <motion.div
             initial={{ scale: 0.92, opacity: 0, y: 16 }}
             animate={leaving ? { scale: 0.96, opacity: 0, y: -8 } : { scale: 1, opacity: 1, y: 0 }}
             transition={leaving ? { duration: 0.4, ease: "easeIn" } : { type: "spring", stiffness: 140, damping: 18 }}
             className="relative w-full max-w-sm rounded-[32px] bg-white/[0.04] border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.65)] backdrop-blur-md px-8 py-10 flex flex-col items-center text-center"
           >
             {/* Corner sparkle accents, matching the deck's understated luxe feel */}
             <span className="absolute top-6 right-7 text-rose-300/40 text-sm">✦</span>
             <span className="absolute bottom-8 left-7 text-indigo-300/30 text-xs">✦</span>

             {/* Icon medallion instead of a bare bouncing emoji */}
             <motion.div
               initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
               animate={{ scale: 1, opacity: 1, rotate: 0 }}
               transition={{ type: "spring", stiffness: 110, damping: 11, delay: 0.1 }}
               className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/20 to-purple-500/20 border border-white/10 shadow-[0_10px_30px_rgba(244,63,94,0.25)]"
             >
               <span className="text-4xl drop-shadow-[0_4px_10px_rgba(244,63,94,0.35)]">
                 ❤️
               </span>
             </motion.div>

             <motion.h2
               initial={{ opacity: 0, y: 12 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.28 }}
               className="mt-7 text-[34px] sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300"
             >
               Beautiful ❤️
             </motion.h2>

             {/* Thin divider, echoes the tape/paper motif's understated detailing */}
             <motion.div
               initial={{ opacity: 0, scaleX: 0 }}
               animate={{ opacity: 1, scaleX: 1 }}
               transition={{ delay: 0.42, duration: 0.4 }}
               className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-rose-300/40 to-transparent"
             />

             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.55 }}
               className="mt-5 text-[15px] sm:text-base leading-7 text-neutral-300/90 font-medium"
             >
               Kuch photos ke liye maar khane ko ready hu... bas zinda chhod dena. 🤣🤗🌸
             </motion.p>

             {onComplete && (
               <motion.button
                 initial={{ opacity: 0, y: 16 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.75 }}
                 whileTap={{ scale: 0.96 }}
                 onClick={continueToChoice}
                 disabled={leaving}
                 className="mt-9 w-full rounded-full px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 shadow-[0_15px_45px_rgba(236,72,153,0.35)] active:shadow-[0_15px_60px_rgba(236,72,153,0.55)] transition-shadow [-webkit-tap-highlight-color:transparent]"
               >
                 Continue ❤️
               </motion.button>
             )}
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>

    </div>
  );
}
