import { motion } from "framer-motion";
import { services } from "../../utils/services";

export default function RightMenu() {
  return (
    <motion.menu
      itemScope
      itemType='http://www.schema.org/SiteNavigationElement'
      className='hidden lg:flex   lg:gap-x-4 xl:gap-x-12 overflow-hidden'
    >
      {services.map((s, index) => (
        <motion.li
          className='grow'
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
            <div className='p-4 hover:bg-slate-200 bg-slate-100 rounded-lg'>
              <img
                className='max-w-[70px] mx-auto'
                src={s.src}
                alt={s.title}
                width={60}
                height={60}
              />
              <div className='text-[14px] max-w-[100px] text-center font-medium text-black '>
                {s.shortTitle}
              </div>
            </div>
          </a>
        </motion.li>
      ))}
    </motion.menu>
  );
}
