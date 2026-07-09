"use client";

import { useState } from "react";
import FloatingHearts from "./FloatingHearts";
import FloatingBalloons from "./FloatingBalloons";
import Sparkles from "./Sparkles";
import GlassCard from "./GlassCard";
import AnimatedButton from "./AnimatedButton";
import Choice from "./Choice";
import GiftBlocked from "./GiftBlocked";
import Letter from "./Letter";
import Gift from "./Gift";
import BackgroundMusic from "./BackgroundMusic";
import Petals from "./Petals";

export default function Hero() {

  const [page, setPage] = useState(0);

  return (

<main className="relative h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-fuchsia-100">
<BackgroundMusic/>

<Petals/>
<FloatingHearts/>

<FloatingBalloons/>

<Sparkles/>

<div className="flex h-full justify-center items-center">

<GlassCard>

{page===0 && (

<>

<h1 className="text-6xl font-bold text-pink-600">

Hey Cutie ❤️

</h1>

<p className="mt-8 text-2xl text-center">

Today is your Birthday 🎂

</p>

<p className="mt-4 text-center">

Someone made something special for you ✨

</p>

<div className="flex justify-center">

<AnimatedButton onClick={()=>setPage(1)}>

Next →

</AnimatedButton>

</div>

</>

)}

{page===1 && (

<Choice

onLetter={()=>setPage(3)}

onGift={()=>setPage(2)}

/>

)}

{page===2 && (

<GiftBlocked

onContinue={()=>setPage(3)}

/>

)}

{page===3 && (
    <Letter onContinue={() => setPage(4)} />
)}

{page===4 && (

<Gift onReveal={()=>setPage(5)} />

)}
{page===5 && (

<div className="text-center">

<h1 className="text-6xl font-bold text-pink-600">

🎉 Surprise!!

</h1>

<p className="mt-8 text-2xl">

Your Real Gift ❤️

</p>

<div className="mt-10">


<div className="space-y-10">

<video

controls

autoPlay

className="rounded-3xl shadow-2xl"

>

<source src="/reel.mp4"/>

</video>

<h2 className="text-5xl font-bold text-pink-600">

Happy Birthday ❤️

</h2>

<p className="text-2xl">

Hope this made you smile 😊

</p>

<p className="text-xl">

Made with ❤️ by Tanay

</p>

</div>
</div>

</div>

)}
</GlassCard>

</div>

</main>

  );

}