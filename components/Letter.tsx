"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

type Props = { onContinue: () => void };

const letterText = `Happy Birthday Chudail !!! 🎂❤️

yrr, Fistly I hope u like this small cute website , pata hai its not your type of celebration phir bhi finger cross 🤞, i know u want to celebrate the birthday with crackers , balloons , cake and decorations vo tumhare future partner karega itna vo deserve karta hai (safeguard 🤣😛)

Aaj kal kuch bolne ke liye baacha he nahi hai and we both know the reason as well , it's okay 😉  and ha bol do yadi kuch bolne ko baacha he nahi hai to abhi likh he kyu raha hai 😆

Aur batao , life me itne problems hai sabse big is to get some one special , understand u and its good looking , so on this special birthday occasion , with my whole heart i pray to god ke mila do isse vo insaan se jiske efforts next level rahe , maan me vichar aye , the next moment he completed it aur khub saare achhi acchi photos le 😅 and iske ups and down me sath de , most importantly isko life time ke liye jhal paye 😍 usse bhi important tum khud jhal pao usse 😅

Mere liye bhi kuch prayer kar lena 🙏 bahut khali khali sa ho gaya hu 🥲

Ye website bananae me 10-12 din lage hai 😢 aur thik thak to baan he gayi hai 😆 , nice business opportunity i can start the business mst paisa he paisa hoyega 😄

Aur ha tumko laga meko excitement nahi hai , but thi just that i didn’t show it as usual 😄

Jaida time le ke boor nahi karuga , enjoy the birthday 🎂

At the end, ye boluga khush raho bindas raho and khud ke Khushi ke bech jo bhi koi aye remove it (including me) make sure your own happiness is the topmost priority 😉

Kuch khas likha nahi upper se ladke ke baat kar de yaha pe bhi aur maan khab kar diya , ab to milne se daar lagta hai kya pata itna maaroge , vase bada hu (9 ghante) maroge to paap khud ko lagega 🤣`;

export default function Letter({ onContinue }: Props) {
  const [opened, setOpened] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  function openEnvelope() {
    if (opened) return;
    setOpened(true);
    window.setTimeout(() => setShowPaper(true), 700);
    window.setTimeout(() => setShowLetter(true), 1400);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
      <AnimatePresence>
        {!opened && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            className="flex w-full flex-col items-center"
          >
            <motion.h2 initial={{ scale: 0.85 }} animate={{ scale: 1 }} className="text-3xl font-bold text-pink-300 sm:text-4xl">
              A Letter For You
            </motion.h2>
            <p className="mt-3 text-sm text-purple-100/70 sm:text-base">Tap the envelope to open it ❤️</p>

            <motion.button
              type="button"
              aria-label="Open birthday letter"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={openEnvelope}
              className="relative mt-9 h-40 w-60 bg-transparent p-0 sm:h-48 sm:w-72"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-300 to-rose-400 shadow-[0_24px_55px_rgba(244,63,94,.3)]" />
              <motion.span
                animate={{ rotateX: opened ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: "top" }}
                className="absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-pink-500 [clip-path:polygon(0_0,100%_0,50%_100%)]"
              />
              <motion.span animate={{ scale: [1, 1.13, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 flex items-center justify-center text-5xl">
                ❤️
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {showPaper && (
        <motion.article
          initial={{ opacity: 0, y: 100, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mx-auto flex h-[74dvh] min-h-[500px] max-h-[720px] w-full max-w-[700px] flex-col overflow-hidden rounded-[24px] border border-pink-200 bg-[#fffdf8] text-[#3f2a45] shadow-2xl sm:h-[72vh] sm:rounded-[28px]"
        >
          <header className="shrink-0 border-b border-pink-200 px-5 py-3 text-left sm:px-8 sm:py-4">
            <h2 className="font-handwritten text-3xl leading-none text-pink-600 sm:text-4xl">Dear Cutie ❤️</h2>
          </header>

          <div className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto px-6 py-6 text-left sm:px-9 sm:py-7">
            {showLetter && (
              <TypeAnimation
                sequence={[letterText]}
                wrapper="div"
                cursor
                speed={88}
                className="font-handwritten w-full max-w-full whitespace-pre-line break-words text-left text-[21px] leading-7 tracking-[0.01em] sm:text-[23px] sm:leading-8"
              />
            )}
            <div className="h-10" />
          </div>

          <footer className="shrink-0 border-t border-pink-200 bg-[#fff8f5] p-3 sm:p-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-base font-bold text-white shadow-lg"
            >
              Continue To Gift 🎁
            </motion.button>
          </footer>
        </motion.article>
      )}
    </div>
  );
}
