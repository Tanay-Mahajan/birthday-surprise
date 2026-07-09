"use client";

import { motion } from "framer-motion";

type Props = {
  onContinue: () => void;
};

export default function GiftBlocked({ onContinue }: Props) {

  return (

<motion.div

initial={{scale:.8,opacity:0}}

animate={{scale:1,opacity:1}}

className="text-center"

>

<h1 className="text-5xl font-bold text-pink-600">

😂 Areeeeee!!

</h1>

<p className="mt-8 text-2xl text-gray-700">

Pehle Letter padh ke aao...

</p>

<p className="text-xl mt-4">

Gift kahin bhaag nahi ja raha 😌❤️

</p>

<button

onClick={onContinue}

className="mt-10 bg-pink-500 px-10 py-4 rounded-full text-white text-xl"

>

Go To Letter 💌

</button>

</motion.div>

  );

}