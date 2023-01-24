import React, { useEffect } from "react";
import { motion } from "framer-motion";
import window from "../../images/services/windows.png";

const addons = [
  {
    id: 1,
    title: "Mycie okien po remoncie",
    price: 45,
    src: window,
    slug: "/test",
  },
  { id: 2, title: "Powierzchnia", price: 6, src: window, slug: "/test" },
  { id: 3, title: "Mycie piekarnika", price: 40, src: window, slug: "/test" },
  { id: 4, title: "Mycie okapu", price: 40, src: window, slug: "/test" },
  {
    id: 5,
    title: "Sprzątanie wnętrza szafek kuchennych",
    price: 55,
    src: window,
    slug: "/test",
  },
  { id: 6, title: "Mycie naczyń", price: 25, src: window, slug: "/test" },
  {
    id: 8,
    title: "Czyszczenie lodówki",
    price: 30,
    src: window,
    slug: "/test",
  },
  { id: 9, title: "Mycie mikrofalówki", price: 15, src: window, slug: "/test" },
  {
    id: 10,
    title: "Sprzątanie balkonu",
    price: 25,
    src: window,
    slug: "/test",
  },
  { id: 11, title: "Prasowanie", price: 45, src: window, slug: "/test" },
  { id: 12, title: "Sprzątanie kuwety", price: 10, src: window, slug: "/test" },
  { id: 13, title: "Dodatkowe godziny", price: 45, src: window, slug: "/test" },
  {
    id: 14,
    title: "Sprzątanie garderoby",
    price: 20,
    src: window,
    slug: "/test",
  },
  {
    id: 15,
    title: "Porządek i czyszczenie wnętrza szafy",
    price: 40,
    src: window,
    slug: "/test",
  },
  {
    id: 16,
    title: "Pranie kanapy dwuosobowej",
    price: 120,
    src: window,
    slug: "/test",
  },
  {
    id: 17,
    title: "Pranie kanapy trzyosobowej",
    price: 140,
    src: window,
    slug: "/test",
  },
  {
    id: 18,
    title: "Pranie narożnika (4 os)",
    price: 160,
    src: window,
    slug: "/test",
  },
  {
    id: 19,
    title: "Pranie narożnika ( 5-6 os. )",
    price: 180,
    src: window,
    slug: "/test",
  },
  {
    id: 20,
    title: "Pranie narożnika (7+ os.)",
    price: 200,
    src: window,
    slug: "/test",
  },
  {
    id: 21,
    title: "Pranie jednoosobowego materaca",
    price: 60,
    src: window,
    slug: "/test",
  },
  {
    id: 22,
    title: "Prania jednoosobowego materaca z obu stron",
    price: 120,
    src: window,
    slug: "/test",
  },
  {
    id: 23,
    title: "Pranie dwuosobowego materaca",
    price: 120,
    src: window,
    slug: "/test",
  },
  {
    id: 24,
    title: "Pranie dwuosobowego materaca z obu stron ",
    price: 220,
    src: window,
    slug: "/test",
  },
  { id: 25, title: "Pranie dywanów", price: 7, src: window, slug: "/test" },
  { id: 26, title: "Pranie wykładziny", price: 6, src: window, slug: "/test" },
  { id: 27, title: "Pranie fotela", price: 35, src: window, slug: "/test" },
  {
    id: 28,
    title: "Pranie krzeseł, taboretów",
    price: 15,
    src: window,
    slug: "/test",
  },
  {
    id: 29,
    title: "Pranie fotela biurowego",
    price: 15,
    src: window,
    slug: "/test",
  },
  {
    id: 30,
    title: "Pranie tapicerowanego zagłówka do łóżka ",
    price: 120,
    src: window,
    slug: "/test",
  },
  {
    id: 31,
    title: "Pranie tapicerki wózka - spacerówki",
    price: 60,
    src: window,
    slug: "/test",
  },
];

export default function Slider() {
  const [width, setWidth] = React.useState(0);
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
    <div className="lg:mx-28">
      <motion.div
        ref={courusel}
        className="cursor-grab overflow-hidden "
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragPropagation={true}
         
        >
          <motion.div  className="flex gap-x-5">
          {addons.map((addon) => {
            return (
              <div  key={addon.id} className="min-w-[200px] lg:min-w-[300px] h-[200px]  lg:h-[300px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center ">
                <div className="cursor-pointer h-3/5" onClick={()=>{location.assign(addon.slug)}} >
                  <div className="flex flex-col   items-center mx-5 h-full ">
                    <div className="flex-none w-[64px] h-[64px]  hover:scale-110 transition duration-300" style={{ backgroundImage: `url(${addon.src})` }}></div>
                    <div className="basis-full flex flex-col justify-center items-center" ><a href={addon.slug} className="inline-block text-[12px] lg:text-lg  font-semibold hover:scale-110 transition duration-300">{addon.title}</a></div>
                    <p className="flex-none lg:text-lg py-2 px-4 bg-amber-600 rounded-md font-extrabold  hover:scale-110 transition duration-300">{addon.price} zł</p>
                  </div>
                </div>
              </div>
            );
          })}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
