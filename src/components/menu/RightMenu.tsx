import { motion } from "framer-motion";
import { services } from "../../utils/services";

export default function RightMenu() {
  return (
    <motion.menu
      itemScope
      itemType='http://www.schema.org/SiteNavigationElement'
      // className='hidden lg:flex   lg:gap-x-4 xl:gap-x-12 overflow-hidden'
      className='hidden lg:flex gap-4 overflow-hidden'
    >
      {services.map((s, index) => (
        <motion.li
          className='w-[150px]'
          itemProp='name'
          key={s.id}
          style={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeOut",
            duration: 0.5,
            delay: (1 * index + 20) / 8,
          }}
        >
          <a className='' href={s.link} key={s.id} itemProp='url'>
            <div className='p-4 hover:bg-slate-200 bg-slate-100 rounded-lg drop-shadow-lg'>
              <img
                className='max-w-[60px] mx-auto'
                src={s.src}
                alt={s.title}
                width={60}
                height={60}
              />
              <div className='text-[18px] text-center font-medium text-black '>
                {s.shortTitle}
              </div>
            </div>
          </a>
          {/* <div className='text-[18px]  text-center font-medium text-black bg-white p-4 '>
            {s.shortTitle}
          </div> */}
        </motion.li>
      ))}
    </motion.menu>
  );
}
