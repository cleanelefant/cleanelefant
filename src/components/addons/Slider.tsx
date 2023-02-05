import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useIntersection from "../../utils/useObserver";
import {addons} from "../../utils/addons";



export default function Slider() {
  const [width, setWidth] = React.useState(0);
  const { bottomRef, topRef, intersection } = useIntersection();
  const courusel = React.useRef<HTMLDivElement>();
  useEffect(() => {
    const scroll_width = Number(
      courusel.current && courusel.current.scrollWidth
    );
    const offset_width = Number(
      courusel.current && courusel.current.offsetWidth
    );
    setWidth(scroll_width - offset_width);
  }, []);
  return (
    <div className='lg:mx-28 rel relative'>
      <div className='absolute top-[-120px] h-px' ref={topRef}></div>
      <motion.div
        ref={courusel}
        className='cursor-grab overflow-hidden '
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag='x'
          dragConstraints={{ right: 0, left: -width }}
          dragPropagation={true}
        >
          <motion.div className='flex gap-x-5'>
            {addons.map((addon) => {
              return (
                <div
                  key={addon.id}
                  className='min-w-[200px] lg:min-w-[300px] h-[200px]  lg:h-[300px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center '
                >
                  <div
                    className='cursor-pointer h-3/5'
                    onClick={() => {
                      location.assign(addon.slug);
                    }}
                  >
                    <div className='flex flex-col   items-center mx-5 h-full '>
                      <div
                        className='flex-none w-[64px] h-[64px]  hover:scale-110 transition duration-300'
                        style={{
                          backgroundImage: `url(${
                            intersection ? addon.src : ""
                          })`,
                        }}
                      ></div>
                      <div className='basis-full flex flex-col justify-center items-center'>
                        <a
                          href={addon.slug}
                          className='inline-block text-[12px] lg:text-lg  font-semibold hover:scale-110 transition duration-300'
                        >
                          {addon.title}
                        </a>
                      </div>
                      <p className='flex-none lg:text-lg py-2 px-4 bg-amber-600 rounded-md font-extrabold  hover:scale-110 transition duration-300'>
                        {addon.price} zł
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
      <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
    </div>
  );
}
