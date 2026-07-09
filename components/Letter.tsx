"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

type Props = {
  onContinue: () => void;
};

export default function Letter({ onContinue }: Props) {

  const [opened, setOpened] = useState(false);
  const [showText, setShowText] = useState(false);

  function openEnvelope() {

    setOpened(true);

    setTimeout(() => {

      setShowText(true);

    }, 1200);

  }

  return (

<div className="w-[650px] text-center">

{!opened && (

<motion.div

whileHover={{
scale:1.05
}}

onClick={openEnvelope}

className="cursor-pointer"

>

<div className="text-[150px]">

💌

</div>

<h2 className="text-3xl font-bold text-pink-600">

Click to Open

</h2>

</motion.div>

)}

{opened && (

<motion.div

initial={{
y:200,
opacity:0
}}

animate={{
y:0,
opacity:1
}}

transition={{
duration:1
}}

>

<div className="text-[100px]">

📜

</div>

{showText && (

<div className="mt-8 bg-white rounded-3xl p-8 shadow-xl">

<TypeAnimation

sequence={[

`Dear Cutie ❤️

Happy Birthday!!

Today isn't just another day...

It's the day someone extremely special came into this world.

I honestly don't know how to explain how much I appreciate our friendship.

Thank you for making me laugh.

Thank you for listening to me.

Thank you for existing.

May this year bring you happiness, success, peace and endless smiles.

Never stop being the amazing person you are.

Happy Birthday once again ❤️🎂

- Tanay`

]}

speed={75}

wrapper="p"

className="whitespace-pre-line text-left text-gray-700 text-lg leading-9"

/>

<button

onClick={onContinue}

className="mt-10 bg-pink-500 text-white px-10 py-4 rounded-full text-xl"

>

Continue →

</button>

</div>

)}

</motion.div>

)}

</div>

  );

}