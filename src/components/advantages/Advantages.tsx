import React from "react";
import price from "../../images/advantages/best-price.png";
import card from "../../images/advantages/wallet.png";
import insurance from "../../images/advantages/insurance.png";
import inventory from "../../images/advantages/cleaning.png";
import useIntersection from "../../utils/useObserver";

const advantages = [
  {
    id: 1,
    src: price,
    title: "Stała cena",
    text: "Cena za sprzątanie zależy od ilości pokojów, a nie od wielkości mieszkania",
  },
  {
    id: 2,
    src: card,
    title: "Kartą lub gotówką",
    text: "Sam wybierasz, jak zapłacić – kartą czy gotówką",
  },
  {
    id: 3,
    src: insurance,
    title: "Nasze usługi są ubezpieczone",
    text: "Płatność dopiero po sprzątaniu",
  },
  {
    id: 4,
    src: inventory,
    title: "Wszystko jest gotowe na sprzątanie",
    text: "Do każdego zamówienia mamy niezbędne środki czystości oraz sprzęt",
  },
];

export default function Advantages() {
  const { bottomRef, topRef, intersection } = useIntersection();
  return (
    <div className='relative'>
      <div className='absolute top-[-120px] h-px' ref={topRef}></div>
      <ul className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8 justify-between pb-4 lg:pb-5 text-sm lg:text-lg'>
        {advantages.map((item) => (
          <li key={item.id} className='text-center p-2 lg:p-8 '>
            <div className='flex justify-center items-center mb-5'>
              <div>
                <img
                  className='hidden lg:block'
                  src={intersection ? item.src : ""}
                  alt={item.title}
                  width={128}
                  height={128}
                />
              </div>
            </div>
            <div className='flex justify-center items-center mb-4'>
              <img
                className='lg:hidden'
                src={intersection ? item.src : ""}
                alt={item.title}
                width={64}
                height={64}
              />
            </div>
            <p className='font-bold lg:text-xl mb-2'>{item.title}</p>
            <p className='text-sm'>{item.text}</p>
          </li>
        ))}
      </ul>
      <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
    </div>
  );
}