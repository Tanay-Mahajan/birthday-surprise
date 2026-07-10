"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
};

export default function CameraFlash({ show }: Props) {
  return (
    <AnimatePresence>

      {show && (

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

          transition={{
            duration: 0.18,
          }}

          className="
            fixed
            inset-0
            z-[999]
            pointer-events-none
          "

        >

          {/* White Flash */}

          <motion.div

            initial={{
              opacity: 1,
            }}

            animate={{
              opacity: 0,
            }}

            transition={{
              duration: 0.22,
            }}

            className="
              absolute
              inset-0
              bg-white
            "

          />

          {/* Lens Glow */}

          <motion.div

            initial={{
              scale: 0.4,
              opacity: 0.9,
            }}

            animate={{
              scale: 2.4,
              opacity: 0,
            }}

            transition={{
              duration: 0.35,
            }}

            className="
              absolute
              left-1/2
              top-1/2
              w-44
              h-44
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white
              blur-3xl
            "

          />

        </motion.div>

      )}

    </AnimatePresence>
  );
}