"use client";

import { useEffect, useRef, useState } from "react";

const PHOTO_VOLUME = 0.3;
const MAIN_VOLUME = 0.3;

export default function BackgroundMusic({ page }: { page: number }) {
  const photoAudioRef = useRef<HTMLAudioElement>(null);
  const mainAudioRef = useRef<HTMLAudioElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Browsers allow sound only after a real user gesture. The opening button
  // provides that gesture; the correct track then starts for the current page.
  useEffect(() => {
    const unlock = () => setUnlocked(true);
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    const photo = photoAudioRef.current;
    const main = mainAudioRef.current;
    if (!photo || !main) return;

    if (!unlocked || muted || page === 0) {
      photo.pause();
      main.pause();
      // Playback state mirrors the two imperative media elements here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
      return;
    }

    if (page === 1) {
      main.pause();
      photo.currentTime = 0;
      photo.volume = PHOTO_VOLUME;
      void photo.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }

    if (page === 2) {
      const photoStartVolume = photo.volume;
      const startedAt = performance.now();
      main.volume = 0;
      void main.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

      const crossfadeTimer = window.setInterval(() => {
        const progress = Math.min((performance.now() - startedAt) / 900, 1);
        photo.volume = photoStartVolume * (1 - progress);
        main.volume = MAIN_VOLUME * progress;

        if (progress >= 1) {
          window.clearInterval(crossfadeTimer);
          photo.pause();
          photo.currentTime = 0;
        }
      }, 40);

      return () => window.clearInterval(crossfadeTimer);
    }

    photo.pause();
    main.volume = MAIN_VOLUME;
    if (main.paused) {
      void main.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      setPlaying(true);
    }

    if (page === 7) {
      const stopTimer = window.setTimeout(() => {
        main.pause();
        setPlaying(false);
      }, 4000);

      return () => window.clearTimeout(stopTimer);
    }
  }, [page, unlocked, muted]);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    setUnlocked(true);
    setMuted((value) => !value);
  }

  return (
    <>
      <audio
        ref={photoAudioRef}
        src="/photos-music.m4a"
        preload="auto"
        onEnded={() => setPlaying(false)}
      />
      <audio ref={mainAudioRef} loop src="/music.m4a" preload="auto" />

      <button
        onClick={toggle}
        className="music-toggle fixed right-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-pink-200/30 bg-slate-950/70 text-base text-white shadow-xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95 select-none sm:right-5 sm:top-5 sm:h-13 sm:w-13 sm:text-xl"
        aria-label={muted ? "Play music" : "Mute music"}
      >
        {!muted && playing ? "🔊" : "🔈"}
      </button>
    </>
  );
}
