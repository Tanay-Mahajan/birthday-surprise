"use client";

export default function Petals(){

return(

<>

{Array.from({length:25}).map((_,i)=>(

<div

key={i}

className="petal"

style={{

left:`${Math.random()*100}%`,

animationDelay:`${Math.random()*8}s`

}}

>

🌸

</div>

))}

</>

);

}