"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_VOLUME = 0.3; // 30%
const MAX_VOLUME = 0.4; // Absolute maximum: 40%

function clampVolume(volume: number) {
  return Math.min(Math.max(volume, 0), MAX_VOLUME);
}

export default function BackgroundMusic({ page }: { page: number }) {
  const photoAudioRef = useRef<HTMLAudioElement>(null);
  const mainAudioRef = useRef<HTMLAudioElement>(null);

  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const unlock = () => setUnlocked(true);

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  // Prevent either audio element from going above 40%.
  useEffect(() => {
    const photo = photoAudioRef.current;
    const main = mainAudioRef.current;

    if (!photo || !main) return;

    const enforcePhotoLimit = () => {
      if (photo.volume > MAX_VOLUME) {
        photo.volume = MAX_VOLUME;
      }
    };

    const enforceMainLimit = () => {
      if (main.volume > MAX_VOLUME) {
        main.volume = MAX_VOLUME;
      }
    };

    photo.volume = DEFAULT_VOLUME;
    main.volume = DEFAULT_VOLUME;

    photo.addEventListener("volumechange", enforcePhotoLimit);
    main.addEventListener("volumechange", enforceMainLimit);

    return () => {
      photo.removeEventListener("volumechange", enforcePhotoLimit);
      main.removeEventListener("volumechange", enforceMainLimit);
    };
  }, []);

  useEffect(() => {
    const photo = photoAudioRef.current;
    const main = mainAudioRef.current;

    if (!photo || !main) return;

    if (!unlocked || muted || page === 0) {
      photo.pause();
      main.pause();
      setPlaying(false);
      return;
    }

    if (page === 1) {
      main.pause();

      photo.currentTime = 0;
      photo.volume = clampVolume(DEFAULT_VOLUME);

      void photo
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

      return;
    }

    if (page === 2) {
      const photoStartVolume = clampVolume(photo.volume);
      const startedAt = performance.now();

      main.volume = 0;

      void main
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

      const crossfadeTimer = window.setInterval(() => {
        const progress = Math.min(
          (performance.now() - startedAt) / 900,
          1,
        );

        photo.volume = clampVolume(
          photoStartVolume * (1 - progress),
        );

        main.volume = clampVolume(
          DEFAULT_VOLUME * progress,
        );

        if (progress >= 1) {
          window.clearInterval(crossfadeTimer);

          photo.pause();
          photo.currentTime = 0;
          photo.volume = DEFAULT_VOLUME;
        }
      }, 40);

      return () => window.clearInterval(crossfadeTimer);
    }

    photo.pause();
    main.volume = clampVolume(DEFAULT_VOLUME);

    if (main.paused) {
      void main
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
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

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    setUnlocked(true);
    setMuted((currentValue) => !currentValue);
  }

  return (
    <>
      <audio
        ref={photoAudioRef}
        src="/photos-music.m4a"
        preload="auto"
        onEnded={() => setPlaying(false)}
      />

      <audio
        ref={mainAudioRef}
        loop
        src="/music.m4a"
        preload="auto"
      />

      <button
        type="button"
        onClick={toggle}
        className="music-toggle fixed right-3 top-3 z-50 flex h-11 w-11 select-none items-center justify-center rounded-full border border-pink-200/30 bg-slate-950/70 text-base text-white shadow-xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95 sm:right-5 sm:top-5 sm:h-13 sm:w-13 sm:text-xl"
        aria-label={muted ? "Play music" : "Mute music"}
      >
        {!muted && playing ? "🔊" : "🔈"}
      </button>
    </>
  );
}