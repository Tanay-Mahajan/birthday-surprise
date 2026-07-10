"use client";

import { useState } from "react";
import FloatingHearts from "./FloatingHearts";
import FloatingBalloons from "./FloatingBalloons";
import Sparkles from "./Sparkles";
import GlassCard from "./GlassCard";
import AnimatedButton from "./AnimatedButton";
import Choice from "./Choice";
import GiftBlocked from "./GiftBlocked";
import Letter from "./Letter";
import Gift from "./Gift";
import BackgroundMusic from "./BackgroundMusic";
import Petals from "./Petals";

export default function Hero() {
  const [page, setPage] = useState(0);

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-6">

      <BackgroundMusic />
      <Petals />
      <FloatingHearts />
      <FloatingBalloons />
      <Sparkles />

      <div className="w-full flex justify-center items-center">

        <GlassCard>

          {/* ---------------- HOME ---------------- */}

          {page === 0 && (
            <div className="flex flex-col items-center text-center">

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-600">
                Hey Cutie ❤️
              </h1>

              <p className="mt-6 text-xl sm:text-2xl font-medium">
                Today is your Birthday 🎂
              </p>

              <p className="mt-3 text-base sm:text-lg text-gray-700 max-w-md">
                Someone made something special just for you ✨
              </p>

              <AnimatedButton onClick={() => setPage(1)}>
                Next →
              </AnimatedButton>

            </div>
          )}

          {/* ---------------- CHOICE ---------------- */}

          {page === 1 && (
            <Choice
              onLetter={() => setPage(3)}
              onGift={() => setPage(2)}
            />
          )}

          {/* ---------------- GIFT BLOCK ---------------- */}

          {page === 2 && (
            <GiftBlocked
              onContinue={() => setPage(3)}
            />
          )}

          {/* ---------------- LETTER ---------------- */}

          {page === 3 && (
            <Letter
              onContinue={() => setPage(4)}
            />
          )}

          {/* ---------------- GIFT ---------------- */}

          {page === 4 && (
            <Gift
              onReveal={() => setPage(5)}
            />
          )}

          {/* ---------------- REEL ---------------- */}

          {page === 5 && (
            <div className="flex flex-col items-center text-center">

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-600">
                🎉 Surprise!!
              </h1>

              <p className="mt-5 text-xl sm:text-2xl">
                Your Real Gift ❤️
              </p>

              <video
                controls
                autoPlay
                playsInline
                className="
                  mt-8
                  w-full
                  max-w-sm
                  sm:max-w-md
                  md:max-w-lg
                  rounded-3xl
                  shadow-2xl
                "
              >
                <source
                  src="/reel.mp4"
                  type="video/mp4"
                />
              </video>

              <h2 className="mt-8 text-3xl sm:text-4xl font-bold text-pink-600">
                Happy Birthday ❤️
              </h2>

              <p className="mt-4 text-lg text-gray-700">
                Hope this made you smile 😊
              </p>

              <p className="mt-6 text-sm text-gray-500">
                Made with ❤️ by Tanay
              </p>

            </div>
          )}

        </GlassCard>

      </div>

    </main>
  );
}