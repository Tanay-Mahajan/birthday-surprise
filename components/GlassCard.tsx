"use client";

import { motion } from "framer-motion";

export default function GlassCard({
children,
}:{
children:React.ReactNode;
}){

return(

<motion.div

initial={{
opacity:0,
scale:.8
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:.8
}}

className="glass w-[800px] max-w-[92%]"

>

{children}

</motion.div>

);

}