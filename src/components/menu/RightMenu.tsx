import { motion} from "framer-motion";
import { services } from "../../utils/services";

export default function RightMenu() {

  return ( 
      <motion.menu
        itemScope
        itemType="http://www.schema.org/SiteNavigationElement"    
        className="hidden 2xl:flex xl:gap-x-2 overflow-hidden"
      >
        {services.map((s, index) => (
          <motion.li
            itemProp="name"
            key={s.id}
            style={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              ease: "easeOut",
              duration: 0.5,
              delay: (1 * index) / 8,
            }}
          >
            <a className="" href={s.link} key={s.id} itemProp="url">
              <div className="p-4 hover:bg-slate-300/75">
                <img
                  className="max-w-[48px] mx-auto  "
                  src={s.src}
                  alt={s.title}
                  width={40}
                  height={40}
                />
                <div className="text-[14px] max-w-[100px] text-center font-medium text-slate-800 ">
                  {s.shortTitle}
                </div>
              </div>
            </a>
          </motion.li>
        ))}
      </motion.menu>
  )
}
