"use client";

import { useRef, useState } from "react";

export default function BackgroundMusic() {

const audioRef = useRef<HTMLAudioElement>(null);

const [playing,setPlaying]=useState(false);

function toggle(){

if(!audioRef.current) return;

if(playing){

audioRef.current.pause();

}
else{

audioRef.current.play();

}

setPlaying(!playing);

}

return(

<>

<audio

ref={audioRef}

loop

src="/music.mp3"

/>

<button

onClick={toggle}

className="fixed top-5 right-5 z-50 bg-white rounded-full p-4 shadow-xl"

>

{playing ? "🔊" : "🔈"}

</button>

</>

);

}