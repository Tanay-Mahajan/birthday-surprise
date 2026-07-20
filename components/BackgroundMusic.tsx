"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteracted = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // This function forces the music to play on the absolute first user interaction
    const forceAutoplay = () => {
      if (hasInteracted.current) return;

      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setPlaying(true);
            hasInteracted.current = true;
            cleanUpListeners();
          })
          .catch((error) => {
            // If browser still blocks it, it will retry on the next movement
            console.log("Autoplay blocked, waiting for distinct gesture...", error);
          });
      }
    };

    const cleanUpListeners = () => {
      window.removeEventListener("click", forceAutoplay);
      window.removeEventListener("touchstart", forceAutoplay);
      window.removeEventListener("pointerdown", forceAutoplay);
      window.removeEventListener("keydown", forceAutoplay);
    };

    // Listen to every possible way a user wakes up or interacts with a page
    window.addEventListener("click", forceAutoplay);
    window.addEventListener("touchstart", forceAutoplay);
    window.addEventListener("pointerdown", forceAutoplay);
    window.addEventListener("keydown", forceAutoplay);

    // Try playing immediately on mount (works if they already interacted with a previous page)
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setPlaying(true);
          hasInteracted.current = true;
          cleanUpListeners();
        })
        .catch(() => {});
    }

    return () => cleanUpListeners();
  }, []);

  function toggle(e: React.MouseEvent) {
    // Stop propagation so global document listeners don't fight with the button toggle
    e.stopPropagation();

    if (!audioRef.current) return;

    hasInteracted.current = true;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((err) => console.log("Playback error:", err));
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/music.mp3"
        preload="auto"
      />

      <button
        onClick={toggle}
        className="music-toggle fixed right-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-pink-200/30 bg-slate-950/70 text-base text-white shadow-xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95 select-none sm:right-5 sm:top-5 sm:h-13 sm:w-13 sm:text-xl"
        aria-label={playing ? "Mute Music" : "Unmute Music"}
      >
        {playing ? "🔊" : "🔈"}
      </button>
    </>
  );
}
