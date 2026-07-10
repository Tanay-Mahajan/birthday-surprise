"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PhotoCard from "./PhotoCard";
import CameraFlash from "./CameraFlash";
import FloatingParticles from "./FloatingParticles";
import PhotoCaption from "./PhotoCaption";

type Props = {
  onComplete?: () => void;
};

const photos = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image6.jpg",
  "/image7.jpg",
  "/image8.jpg",
  "/image9.jpg",
  "/image10.jpg",
];

const captions = [
  "❤️ Beautiful",
  "🥰 Gorgeous",
  "✨ Stunning",
  "🌸 Pretty",
  "💖 Adorable",
  "😍 Lovely",
  "💕 Amazing",
  "🌷 Elegant",
  "😊 Precious",
  "❤️ Perfect",
];

const rotations = [-5, 4, -3, 5, -4, 3, -6, 4, -2, 5];

export default function PhotoPopSurprise({
  onComplete,
}: Props) {

  const [index, setIndex] = useState(0);

  const [flash, setFlash] = useState(false);

  const [showEnding, setShowEnding] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimer() {

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      nextPhoto();
    }, 3200);

  }

  function nextPhoto() {

    if (flash) return;

    if (showEnding) return;

    if (index >= photos.length - 1) {

      setShowEnding(true);

      return;

    }

    setFlash(true);

    setTimeout(() => {

      setIndex((prev) => prev + 1);

    }, 180);

    setTimeout(() => {

      setFlash(false);

    }, 360);

  }

  useEffect(() => {

    if (!showEnding) {

      resetTimer();

    }

    return () => {

      if (timerRef.current) {

        clearTimeout(timerRef.current);

      }

    };

  }, [index, showEnding]);

  useEffect(() => {

    if (!flash && !showEnding) {

      resetTimer();

    }

  }, [flash]);

  return (

    <div

      className="
        relative
        min-h-screen
        overflow-hidden

        flex
        items-center
        justify-center

        px-4
        py-8

        bg-gradient-to-br
        from-rose-100
        via-pink-50
        to-purple-100
      "

    >

      {/* Animated Blurred Background */}

      <AnimatePresence mode="wait">

        <motion.div

          key={photos[index]}

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          exit={{ opacity: 0 }}

          transition={{ duration: .8 }}

          className="absolute inset-0"

        >

          <motion.img

            src={photos[index]}

            alt=""

            animate={{

              scale: [1.1, 1.2, 1.1],

            }}

            transition={{

              repeat: Infinity,

              duration: 12,

              ease: "linear",

            }}

            className="
              absolute
              inset-0

              w-full
              h-full

              object-cover

              blur-[90px]

              opacity-30

              saturate-150
            "

          />

          <div

            className="
              absolute
              inset-0

              bg-gradient-to-br

              from-pink-100/60

              via-white/30

              to-rose-200/60
            "

          />

        </motion.div>

      </AnimatePresence>

      <FloatingParticles />

      <CameraFlash show={flash} />

      {/* Glass Container */}

      <div

        className="
          relative
          z-20

          glass

          rounded-[36px]

          border
          border-white/40

          bg-white/15

          backdrop-blur-2xl

          shadow-[0_25px_80px_rgba(236,72,153,.18)]

          p-5

          sm:p-7
        "

      >

        {/* Stack starts here */}
                <div
                  onClick={nextPhoto}
                  className="
                    relative
                    w-[84vw]
                    max-w-[360px]

                    h-[500px]
                    sm:h-[560px]

                    cursor-pointer
                    select-none
                  "
                >

                  {/* Third Card */}

                  {photos[index + 2] && (

                    <motion.div

                      className="absolute inset-0 z-10"

                      animate={{
                        scale: .92,
                        rotate: -7,
                        y: 22,
                        opacity: .55,
                      }}

                      transition={{
                        duration: .45,
                      }}

                    >

                      <PhotoCard

                        src={photos[index + 2]}

                        rotation={-7}

                      />

                    </motion.div>

                  )}

                  {/* Second Card */}

                  {photos[index + 1] && (

                    <motion.div

                      className="absolute inset-0 z-20"

                      animate={{
                        scale: .96,
                        rotate: 5,
                        y: 10,
                        opacity: .82,
                      }}

                      transition={{
                        duration: .45,
                      }}

                    >

                      <PhotoCard

                        src={photos[index + 1]}

                        rotation={5}

                      />

                    </motion.div>

                  )}

                  {/* Front Card */}

                  <AnimatePresence mode="wait">

                    <motion.div

                      key={index}

                      className="absolute inset-0 z-30"

                      initial={{
                        opacity: 0,
                        scale: .72,
                        y: 150,
                        rotate: rotations[index],
                      }}

                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotate: rotations[index],
                      }}

                      exit={{
                        opacity: 0,
                        scale: .92,
                        rotate: rotations[index] + 18,
                        x: 260,
                        y: -220,
                      }}

                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                      }}

                      whileTap={{
                        scale: .97,
                      }}

                    >

                      <PhotoCard

                        src={photos[index]}

                        caption=""

                        rotation={rotations[index]}

                      />

                    </motion.div>

                  </AnimatePresence>

                </div>

                {/* Caption */}

                {!showEnding && (

                  <div
                    className="
                      absolute

                      -bottom-12

                      left-0
                      right-0

                      flex
                      justify-center
                    "
                  >

                    <PhotoCaption

                      text={captions[index]}

                    />

                  </div>

                )}

              </div>
                    {/* Ending Screen */}

                    <AnimatePresence>

                      {showEnding && (

                        <motion.div

                          initial={{
                            opacity: 0,
                          }}

                          animate={{
                            opacity: 1,
                          }}

                          exit={{
                            opacity: 0,
                          }}

                          className="
                            absolute
                            inset-0
                            z-50

                            flex
                            flex-col

                            items-center
                            justify-center

                            bg-gradient-to-br
                            from-pink-500/35
                            via-rose-500/30
                            to-purple-500/35

                            backdrop-blur-2xl

                            px-6
                          "

                        >

                          <motion.div

                            initial={{
                              scale: .4,
                              opacity: 0,
                            }}

                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}

                            transition={{
                              type: "spring",
                              stiffness: 120,
                              damping: 12,
                            }}

                            className="text-8xl"

                          >

                            ❤️

                          </motion.div>

                          <motion.h2

                            initial={{
                              opacity: 0,
                              y: 20,
                            }}

                            animate={{
                              opacity: 1,
                              y: 0,
                            }}

                            transition={{
                              delay: .3,
                            }}

                            className="
                              mt-8

                              text-4xl
                              sm:text-5xl

                              font-bold

                              text-white

                              drop-shadow-lg
                            "

                          >

                            Beautiful ❤️

                          </motion.h2>

                          <motion.p

                            initial={{
                              opacity: 0,
                            }}

                            animate={{
                              opacity: 1,
                            }}

                            transition={{
                              delay: .6,
                            }}

                            className="
                              mt-5

                              max-w-sm

                              text-center

                              leading-8

                              text-white/90

                              text-lg
                            "

                          >

                            Hope these little memories
                            made you smile. 🌸

                          </motion.p>

                          {onComplete && (

                            <motion.button

                              initial={{
                                opacity: 0,
                                y: 30,
                              }}

                              animate={{
                                opacity: 1,
                                y: 0,
                              }}

                              transition={{
                                delay: 1,
                              }}

                              whileHover={{
                                scale: 1.05,
                              }}

                              whileTap={{
                                scale: .95,
                              }}

                              onClick={onComplete}

                              className="
                                mt-12

                                rounded-full

                                px-12
                                py-4

                                text-lg
                                font-bold

                                text-white

                                bg-gradient-to-r
                                from-pink-500
                                via-rose-500
                                to-purple-500

                                shadow-[0_20px_60px_rgba(236,72,153,.45)]
                              "

                            >

                              Continue ❤️

                            </motion.button>

                          )}

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </div>

                );

              }