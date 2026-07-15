"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PhotoCard from "./PhotoCard";
import CameraFlash from "./CameraFlash";
import FloatingParticles from "./FloatingParticles";

type Props = {
  onComplete?: () => void;
};

type Memory  = {
  type: "photo" | "video";
  src: string;
  caption: string;
};
const memories: Memory[] = [
  {
    type: "photo",
    src: "/image2.jpg",
    caption: "❤️ Beautiful",
  },
  {
      type: "photo",
      src: "/image3.jpg",
      caption: "❤️ Beautiful",
    },
 {
      type: "photo",
      src: "/image4.jpg",
      caption: "❤️ Beautiful",
    },
 {
      type: "photo",
      src: "/image5.jpg",
      caption: "❤️ Beautiful",
    },
  {
    type: "photo",
    src: "/image6.jpg",
    caption: "🥰 Gorgeous",
  },
   {
      type: "video",
      src: "/carDriving.mp4",
      caption: "🎥 A Special Memory",
    },
  {
    type: "photo",
    src: "/image7.jpg",
    caption: "✨ Stunning",
  },
  {
        type: "photo",
        src: "/image9.jpg",
        caption: "✨ Stunning",
      }

  // VIDEO HERE



];


const rotations = [-5, 4, -3, 5, -4, 3, -6, 4, -2, 5];

export default function PhotoPopSurprise({
  onComplete,
}: Props) {

  const [index, setIndex] = useState(0);

  const [flash, setFlash] = useState(false);

  const [showEnding, setShowEnding] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const isAdvancing = useRef(false);
  const currentMemory = memories[index];
  const backgroundImage =
    memories
      .slice(0, index + 1)
      .reverse()
      .find((memory) => memory.type === "photo")?.src ?? memories[0].src;

  /* ---------- preload images ---------- */

  useEffect(() => {

    memories.forEach((item) => {

      if (item.type === "photo") {

        const img = new Image();
        img.src = item.src;

      } else {

        const video = document.createElement("video");
        video.preload = "auto";
        video.src = item.src;

      }

    });

  }, []);

  /* ---------- auto timer ---------- */

 useEffect(() => {

   if (showEnding) return;

   if (currentMemory.type === "video") return;

   if (timer.current) {
     clearTimeout(timer.current);
   }

   timer.current = setTimeout(() => {
     nextPhoto();
   }, 4000);

   return () => {
     if (timer.current) {
       clearTimeout(timer.current);
     }
   };

 }, [index, showEnding, currentMemory.type]);

  function nextFromVideo() {
    advanceToNext();
  }

  function advanceToNext() {
    if (isAdvancing.current || showEnding) return;

    isAdvancing.current = true;

    if (index >= memories.length - 1) {
      setShowEnding(true);
      return;
    }

    setIndex((previousIndex) => previousIndex + 1);

    // Keep the transition locked while the outgoing card is animating. This
    // also prevents a trailing video `ended` event from skipping a memory.
    setTimeout(() => {
      isAdvancing.current = false;
    }, 350);
  }

  function nextPhoto() {
    if (isAdvancing.current || showEnding) return;

    // Tapping a video should dismiss it just like a photo. Its native end event
    // uses the same guarded path, so the two cannot advance twice.
    if (currentMemory.type === "video") {
      advanceToNext();
      return;
    }

    if (index >= memories.length - 1) {
      advanceToNext();
      return;
    }

    isAdvancing.current = true;

    navigator.vibrate?.(35);

    setFlash(true);

    setTimeout(() => {

      setIndex((i) => i + 1);

    }, 170);

    setTimeout(() => {

      setFlash(false);
      isAdvancing.current = false;

    }, 320);

  }

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
         from-slate-950
         via-fuchsia-950
         to-violet-950
       "
     >

       {/* Background */}

       <motion.img

         key={backgroundImage}

         src={backgroundImage}

         alt=""

         initial={{ opacity: 0 }}

         animate={{ opacity: .18 }}

         transition={{ duration: .45 }}

         className="
           absolute
           inset-0

           w-full
           h-full

           object-cover

           blur-[45px]

           scale-110
         "

       />

       <div

         className="
           absolute
           inset-0

           bg-gradient-to-br

           from-slate-950/80

           via-fuchsia-950/65

           to-violet-950/80
         "

       />

       <FloatingParticles />

       <CameraFlash show={flash} />

       {/* Glass */}

       <div

         className="
           relative
           z-20

           glass

           rounded-[34px]

           bg-white/20

           border
           border-white/40

           backdrop-blur-xl

           shadow-[0_25px_70px_rgba(236,72,153,.15)]

           p-5
         "

       >

         <div

           onClick={nextPhoto}

           className="
             relative

             w-[82vw]

             max-w-[340px]

             h-[490px]

             sm:h-[540px]

             cursor-pointer

             select-none
           "

         >

           {/* Third Paper */}

           <motion.div

             animate={{

               rotate:-7,

               y:16,

               scale:.93,

             }}

             className="
               absolute

               inset-0

               rounded-[26px]

               bg-white

               border

               border-pink-100

               shadow-xl

               z-10
             "

           />

           {/* Second Paper */}

           <motion.div

             animate={{

               rotate:5,

               y:8,

               scale:.97,

             }}

             className="
               absolute

               inset-0

               rounded-[26px]

               bg-white

               border

               border-pink-100

               shadow-xl

               z-20
             "

           />

           {/* Current Photo */}

           <AnimatePresence mode="popLayout">

             <motion.div

               key={index}

               className="absolute inset-0 z-30"

               initial={{

                 opacity:0,

                 scale:.72,

                 y:180,

                 rotate:rotations[index]-8,

               }}

               animate={{

                 opacity:1,

                 scale:1,

                 y:0,

                 rotate:rotations[index],

               }}

               exit={{

                 opacity:0,

                 x:320,

                 y:-220,

                 rotate:rotations[index]+24,

                 scale:.9,

               }}

               transition={{

                 type:"spring",

                 stiffness:120,

                 damping:18,

               }}

               whileTap={{

                 scale:.96,

                 rotate:rotations[index]+3,

               }}

             >

               <PhotoCard
                 type={memories[index].type}
                 src={memories[index].src}
                 caption={memories[index].caption}
                 rotation={rotations[index]}
                 onVideoEnd={nextFromVideo}
               />

             </motion.div>

           </AnimatePresence>

         </div>        {/* Caption */}

                       {!showEnding && (

                         <div
                           className="
                             absolute

                             -bottom-16

                             left-0
                             right-0

                             flex
                             flex-col
                             items-center
                           "
                         >

                           <motion.p

                             animate={{
                               opacity: [0.3, 1, 0.3],
                             }}

                             transition={{
                               repeat: Infinity,
                               duration: 2,
                             }}

                             className="
                               mt-3

                               text-xs

                               tracking-[0.25em]

                               text-pink-600

                               font-semibold
                             "

                           >

                             👆 Tap photo or wait...

                           </motion.p>

                         </div>

                       )}

                     </div>

                     {/* Ending */}

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

                             bg-white/20

                             backdrop-blur-2xl

                             px-6
                           "

                         >

                           <motion.div

                             initial={{
                               scale: .5,
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

                               text-pink-600
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

                               text-gray-700
                             "

                           >

                             For few photos maar khane ke liye ready hu ,
                             Bus zinda chodd dena 🤗🌸


                           </motion.p>

                           {onComplete && (

                             <motion.button

                               initial={{
                                 opacity: 0,
                                 y: 25,
                               }}

                               animate={{
                                 opacity: 1,
                                 y: 0,
                               }}

                               transition={{
                                 delay: 1,
                               }}

                               whileHover={{
                                 scale: 1.04,
                               }}

                               whileTap={{
                                 scale: .96,
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

                                 shadow-[0_15px_50px_rgba(236,72,153,.35)]
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
