"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";

type GiftProps = {
  onReveal: () => void;
};

export default function Gift({ onReveal }: GiftProps) {

  const TOTAL = 15;

  const [seconds, setSeconds] = useState(TOTAL);

  const [finished, setFinished] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);

  const [opening, setOpening] = useState(false);

  useEffect(() => {

    if (finished) return;

    if (seconds <= 0) {

      setFinished(true);

      return;

    }

    const timer = setTimeout(() => {

      setSeconds((s) => s - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [seconds, finished]);

  function revealGift() {

    setOpening(true);

    setShowConfetti(true);

    confetti({

      particleCount: 350,

      spread: 180,

      origin: {

        y: 0.6,

      },

    });

    setTimeout(() => {

      onReveal();

    }, 1800);

  }

  const progress = ((TOTAL - seconds) / TOTAL) * 100;

  const circumference = 2 * Math.PI * 70;

  const offset = circumference - (progress / 100) * circumference;

  return (

    <div className="w-full max-w-md sm:max-w-lg mx-auto text-center">

      {showConfetti && (

        <Confetti

          recycle={false}

          numberOfPieces={400}

        />

      )}

      <motion.h1

        initial={{

          opacity:0,

          y:-30,

        }}

        animate={{

          opacity:1,

          y:0,

        }}

        className="
        text-3xl
        sm:text-5xl
        font-bold
        text-pink-600
        "

      >

        🎁 Your Gift

      </motion.h1>

      <motion.p

        initial={{

          opacity:0,

        }}

        animate={{

          opacity:1,

        }}

        transition={{

          delay:.4,

        }}

        className="
        mt-4
        text-base
        sm:text-lg
        text-gray-600
        "

      >

        Finally...
        You reached the gift 😄

      </motion.p>

      {/* Gift Box */}

      <motion.div

        animate={

          opening

            ? {

                scale: [1, 1.15, 0],

                rotate: [0, 20, -20, 0],

              }

            : {

                rotate: [-4, 4, -4],

                y: [0, -8, 0],

              }

        }

        transition={

          opening

            ? {

                duration: 1.4,

              }

            : {

                repeat: Infinity,

                duration: 1.2,

              }

        }

        className="
        mt-10
        text-[110px]
        "

      >

        🎁

      </motion.div>

      <motion.h2

        initial={{

          opacity:0,

        }}

        animate={{

          opacity:1,

        }}

        transition={{

          delay:.8,

        }}

        className="
        mt-6
        text-2xl
        sm:text-3xl
        font-bold
        "

      >

        Arreeee... 😌

      </motion.h2>

      <motion.p

        initial={{

          opacity:0,

        }}

        animate={{

          opacity:1,

        }}

        transition={{

          delay:1.2,

        }}

        className="
        mt-3
        text-lg
        sm:text-xl
        "

      >

        Itna Pyaara Sa Friend Hu...

      </motion.p>

      <motion.h2

        animate={{

          scale:[1,1.06,1],

        }}

        transition={{

          repeat:Infinity,

          duration:1.5,

        }}

        className="
        mt-4
        text-3xl
        sm:text-4xl
        font-bold
        text-pink-600
        "

      >

        Wahi Gift Hai ❤️😂

      </motion.h2>

      <AnimatePresence>

        {!finished && (

          <motion.div

            initial={{

              opacity:0,

            }}

            animate={{

              opacity:1,

            }}

            className="mt-10"

          >

            <p

              className="
              text-lg
              text-gray-700
              "

            >

              Okay Okay...

              <br/>

              Mood Off Mat Karo 😅

            </p>

            <div

              className="
              mt-8
              flex
              justify-center
              "

            >

              <svg

                width="170"

                height="170"

              >

                <circle

                  cx="85"

                  cy="85"

                  r="70"

                  fill="none"

                  stroke="#fbcfe8"

                  strokeWidth="12"

                />

                <motion.circle

                  cx="85"

                  cy="85"

                  r="70"

                  fill="none"

                  stroke="#ec4899"

                  strokeWidth="12"

                  strokeLinecap="round"

                  strokeDasharray={circumference}

                  animate={{

                    strokeDashoffset: offset,

                  }}

                  style={{

                    rotate:-90,

                    transformOrigin:"50% 50%",

                  }}

                />

                <text

                  x="50%"

                  y="52%"

                  dominantBaseline="middle"

                  textAnchor="middle"

                  fontSize="42"

                  fontWeight="bold"

                  fill="#db2777"

                >

                  {seconds}

                </text>

              </svg>

            </div>
                        <p
                          className="
                          mt-6
                          text-gray-500
                          text-sm
                          sm:text-base
                          "
                        >
                          Secret gift is loading...
                        </p>

                      </motion.div>

                    )}

                  </AnimatePresence>

                  <AnimatePresence>

                    {finished && (

                      <motion.div

                        initial={{
                          opacity:0,
                          scale:.7,
                          y:20,
                        }}

                        animate={{
                          opacity:1,
                          scale:1,
                          y:0,
                        }}

                        transition={{
                          duration:.8,
                        }}

                        className="mt-10"

                      >

                        <motion.h2

                          animate={{
                            scale:[1,1.05,1],
                          }}

                          transition={{
                            repeat:Infinity,
                            duration:1.8,
                          }}

                          className="
                          text-3xl
                          sm:text-4xl
                          font-bold
                          text-pink-600
                          "

                        >

                          😂 Okay Okay...

                        </motion.h2>

                        <p

                          className="
                          mt-4
                          text-lg
                          sm:text-xl
                          text-gray-700
                          "

                        >

                          Itna bhi mood off mat karo...

                        </p>

                        <p

                          className="
                          mt-2
                          text-gray-500
                          "

                        >

                          Chalo...
                          Bata hi deta hoon 😌

                        </p>

                        <motion.button

                          whileHover={{
                            scale:1.05,
                          }}

                          whileTap={{
                            scale:.96,
                          }}

                          onClick={revealGift}

                          className="
                          mt-10
                          w-full
                          rounded-full
                          bg-gradient-to-r
                          from-pink-500
                          via-rose-500
                          to-purple-500
                          py-4
                          text-white
                          text-lg
                          sm:text-xl
                          font-bold
                          shadow-2xl
                          "

                        >

                          🎁 Reveal My Real Gift

                        </motion.button>

                        <motion.p

                          initial={{
                            opacity:0,
                          }}

                          animate={{
                            opacity:1,
                          }}

                          transition={{
                            delay:.8,
                          }}

                          className="
                          mt-6
                          text-sm
                          italic
                          text-pink-500
                          "

                        >

                          I hope this little surprise makes you smile ❤️

                        </motion.p>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </div>

              );

            }