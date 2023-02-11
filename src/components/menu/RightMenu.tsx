import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { services } from "../../utils/services";

export default function RightMenu() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <motion.div
      initial={true}
      animate={isOpen ? "open" : "closed"}
      className='hidden lg:block '
    >
      {/* <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className=' mx-auto flex items-center justify-center gap-x-5 my-5 p-4 bg-white rounded-full drop-shadow-2xl'
      >
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg width='30' height='30' fill='black' viewBox='0 0 20 20'>
            <path d='M0 7 L 20 7 L 10 16' />
          </svg>
        </motion.div>
      </motion.button> */}

      <motion.menu
        itemScope
        itemType='http://www.schema.org/SiteNavigationElement'
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className='flex xl:gap-x-2 p-2 drop-shadow-2xl overflow-hidden'
      >
        {services.map((s, index) => (
          <motion.li
            itemProp='name'
            key={s.id}
            style={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              ease: "easeOut",
              duration: 0.5,
              delay: (1 * index) / 8,
            }}
            className='py-1 group'
          >
            <a
              className='rounded-lg shadow-lg '
              href={s.link}
              key={s.id}
              itemProp='url'
            >
              <img
                className='max-w-[48px] mx-auto group-hover:scale-125 transition-transform '
                src={s.src}
                alt={s.title}
                width={40}
                height={40}
              />
              <div className='text-[12px] max-w-[100px] text-center font-medium font-mono'>
                {s.title}
              </div>
            </a>
          </motion.li>
        ))}
      </motion.menu>
    </motion.div>
  );
}
