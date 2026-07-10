"use client";

import { motion } from "framer-motion";

type Props = {
  src: string;
  caption?: string;
  rotation?: number;
};

export default function PhotoCard({
  src,
  caption = "",
  rotation = 0,
}: Props) {
  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
        rotate: rotation,
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        },
        rotate: {
          duration: 0.6,
        },
      }}
      className="relative w-[88vw] max-w-[360px] sm:max-w-[390px]"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Shadow */}

      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.28, 0.38, 0.28],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-5
          right-5
          -bottom-6
          h-10
          rounded-full
          bg-black
          blur-2xl
        "
      />

      {/* Tape */}

      <motion.div
        animate={{
          rotate: [-3, 2, -3],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          -translate-x-1/2
          -top-4
          w-24
          h-8
          rounded-sm
          bg-yellow-100/60
          backdrop-blur-sm
          border
          border-white/30
          shadow-md
          z-30
        "
      />

      {/* Paper */}

      <div
        className="
          relative
          rounded-xl
          bg-[#fffefb]
          p-3
          pb-7
          shadow-[0_25px_70px_rgba(0,0,0,.45)]
          overflow-hidden
          border
          border-gray-100
        "
      >
        {/* Paper Texture */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)]
            [background-size:14px_14px]
            pointer-events-none
          "
        />

        {/* Photo */}

        <div
          className="
            relative
            h-[420px]
            overflow-hidden
            rounded-md
            bg-gray-100
          "
        >
          <motion.img
            src={src}
            alt=""
            animate={{
              scale: [1, 1.08],
              x: [0, -10, 8, 0],
              y: [0, -6, 6, 0],
            }}
            transition={{
              duration: 7,
              ease: "linear",
            }}
            className="
              w-full
              h-full
              object-cover
            "
          />

          {/* Gloss Reflection */}

          <motion.div
            initial={{
              x: "-140%",
            }}
            animate={{
              x: "180%",
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "linear",
            }}
            className="
              absolute
              top-0
              bottom-0
              w-20
              bg-white/25
              blur-xl
              rotate-12
            "
          />

          {/* Soft vignette */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/15
              via-transparent
              to-white/5
            "
          />
        </div>

        {/* Caption */}

        {caption && (
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="mt-5"
          >
            <p
              className="
                text-center
                text-lg
                font-semibold
                text-gray-700
                tracking-wide
              "
              style={{
                fontFamily: "Caveat, cursive",
              }}
            >
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}