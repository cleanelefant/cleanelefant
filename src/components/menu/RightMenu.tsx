import React, { useEffect } from "react";
import { motion } from "framer-motion";

const items = [   
    {id:1, bg:"bg-green-300"},
    {id:2, bg:"bg-red-300"},
    {id:3, bg:"bg-cyan-300"},
    {id:4, bg:"bg-white"},
    {id:5, bg:"bg-red-700"},
    {id:6, bg:"bg-orange-300"},
    {id:7, bg:"bg-slate-300"},
    {id:8, bg:"bg-yellow-300"},
   
]

export default function RightMenu() {
  return (
    <div className="hidden lg:block fixed right-5 top-32 z-50">
        <div className="flex flex-col gap-y-5">
        {items.map(item=> <motion.div
        style={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ ease: "easeOut", duration: 0.2, delay: (1 * item.id)/8}}
        className={`w-20 h-[8vh] ${item.bg}`}
      ></motion.div>)}
      </div>
     
    </div>
  );
}
