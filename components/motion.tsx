"use client";
import { motion,useReducedMotion } from "framer-motion";
export function Reveal({children,delay=0}:{children:React.ReactNode,delay?:number}){const reduced=useReducedMotion();return <motion.div initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.22}} transition={{type:"spring",stiffness:110,damping:20,delay}}>{children}</motion.div>}
export function TiltCard({children,className=""}:{children:React.ReactNode,className?:string}){const reduced=useReducedMotion();return <motion.article className={className} whileHover={reduced?undefined:{y:-5,rotateX:2,rotateY:-2}} transition={{type:"spring",stiffness:280,damping:21}}>{children}</motion.article>}
