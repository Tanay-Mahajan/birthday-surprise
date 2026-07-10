"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

type Props = {
  onContinue: () => void;
};

export default function Letter({ onContinue }: Props) {

  const [opened, setOpened] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  function openEnvelope() {

    if (opened) return;

    setOpened(true);

    setTimeout(() => {
      setShowPaper(true);
    }, 700);

    setTimeout(() => {
      setShowLetter(true);
    }, 1400);

  }

  return (

    <div className="w-full max-w-md sm:max-w-2xl mx-auto text-center">

      <AnimatePresence>

        {!opened && (

          <motion.div

            initial={{
              opacity:0,
              y:40,
            }}

            animate={{
              opacity:1,
              y:0,
            }}

            exit={{
              opacity:0,
            }}

            className="flex flex-col items-center"

          >

            <motion.h2

              initial={{
                scale:.8,
              }}

              animate={{
                scale:1,
              }}

              className="
              text-3xl
              sm:text-5xl
              font-bold
              text-pink-600
              "

            >

              💌 A Letter For You

            </motion.h2>

            <p className="mt-4 text-gray-600">

              Tap the envelope ❤️

            </p>

            <motion.div

              whileHover={{
                scale:1.05,
              }}

              whileTap={{
                scale:.95,
              }}

              onClick={openEnvelope}

              className="
              relative
              mt-10
              w-72
              h-48
              cursor-pointer
              "

            >

              {/* Body */}

              <div

                className="
                absolute
                inset-0
                rounded-2xl
                bg-gradient-to-br
                from-pink-300
                to-pink-400
                shadow-2xl
                "

              />

              {/* Flap */}

              <motion.div

                animate={{
                  rotateX:opened?180:0,
                }}

                transition={{
                  duration:.8,
                }}

                style={{
                  transformOrigin:"top",
                }}

                className="
                absolute
                top-0
                left-0
                w-full
                h-24
                rounded-t-2xl
                bg-pink-500
                "

              />

              {/* Heart */}

              <motion.div

                animate={{
                  scale:[1,1.15,1],
                }}

                transition={{
                  repeat:Infinity,
                  duration:1.5,
                }}

                className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                text-5xl
                "

              >

                ❤️

              </motion.div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {showPaper && (

        <motion.div

          initial={{
            opacity:0,
            y:200,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            duration:1,
          }}

          className="
          mt-8
          h-[70vh]
          w-full
          bg-[#fffdf8]
          rounded-3xl
          shadow-2xl
          border-2
          border-pink-200
          overflow-hidden
          flex
          flex-col
          "

        >

          {/* Header */}

          <div className="border-b border-pink-200 p-5">

            <h2

              className="
              text-4xl
              text-pink-600
              "

              style={{
                fontFamily:"Caveat,cursive"
              }}

            >

              Dear Cutie ❤️

            </h2>

          </div>

          {/* Scroll Area */}

          <div

            className="
            flex-1
            overflow-y-auto
            px-6
            py-5
            text-left
            "

          >
                      {showLetter && (

                        <TypeAnimation

                          sequence={[

          `Happy Birthday Princess!! 🎂❤️

          I don't know if this little website can express everything I want to say,
          but I still wanted to try.

          Today is your day...

          A day that deserves lots of smiles,
          lots of happiness,
          and lots of beautiful memories.

          Thank you for being such a wonderful friend.

          Every conversation,
          every laugh,
          every silly moment,
          every memory...

          means more than you probably know.

          I genuinely wish that this year brings you
          everything you've been hoping for.

          May all your dreams come true.

          May you always stay happy.

          May you always keep smiling.

          And whenever life gets difficult,
          always remember that you are much stronger than you think.

          Never change the beautiful person you are.

          Keep shining.
          Keep smiling.
          Keep being yourself.

          Because that's exactly what makes you special. ❤️

          Now...
          Before you continue...

          I have one more thing to tell you...

          👇 Keep scrolling 😄`

                          ]}

                          wrapper="div"

                          cursor={true}

                          speed={55}

                          className="
                          whitespace-pre-line
                          text-gray-700
                          leading-9
                          text-lg
                          "

                        />

                        )}

                        {/* Extra Space */}

                        <div className="h-24"></div>

                    </div>

                    {/* Bottom Button */}
                              <div
                                className="
                                  border-t
                                  border-pink-200
                                  bg-white/90
                                  backdrop-blur-md
                                  p-5
                                  shrink-0
                                "
                              >

                                <motion.button

                                  whileHover={{
                                    scale: 1.03,
                                  }}

                                  whileTap={{
                                    scale: 0.96,
                                  }}

                                  onClick={onContinue}

                                  className="
                                    w-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-pink-500
                                    to-rose-500
                                    text-white
                                    py-4
                                    text-lg
                                    sm:text-xl
                                    font-bold
                                    shadow-xl
                                    hover:shadow-2xl
                                    transition-all
                                    duration-300
                                  "

                                >

                                  🎁 Continue To Gift

                                </motion.button>

                              </div>

                            </motion.div>

                          )}

                        </div>

                      );

                    }