"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  text: string;
};

export default function PhotoCaption({ text }: Props) {
  return (
    <AnimatePresence mode="wait">

      <motion.div

        key={text}

        initial={{
          opacity: 0,
          y: 35,
          scale: 0.95,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        exit={{
          opacity: 0,
          y: -20,
          scale: 0.95,
        }}

        transition={{
          duration: 0.45,
        }}

        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          z-40
          w-[90%]
          max-w-sm
        "

      >

        <div

          className="
            relative

            rounded-full

            bg-white/15

            backdrop-blur-xl

            border

            border-white/20

            shadow-[0_10px_35px_rgba(255,255,255,.12)]

            px-6

            py-4

            overflow-hidden
          "

        >

          {/* Moving Shine */}

          <motion.div

            initial={{
              x: "-120%",
            }}

            animate={{
              x: "220%",
            }}

            transition={{
              repeat: Infinity,
              duration: 2.8,
              ease: "linear",
            }}

            className="
              absolute
              top-0
              bottom-0
              w-16
              bg-white/25
              blur-lg
              rotate-12
            "

          />

          {/* Caption */}

          <motion.p

            animate={{
              scale: [1, 1.03, 1],
            }}

            transition={{
              repeat: Infinity,
              duration: 2,
            }}

            className="
              relative

              text-center

              text-white

              text-lg

              sm:text-xl

              font-semibold

              tracking-wide

              drop-shadow-lg
            "

          >

            {text}

          </motion.p>

        </div>

      </motion.div>

    </AnimatePresence>
  );
}