import React from "react";
import { OrderStateType } from "../../types";

interface IOrderLink {
  parentState: OrderStateType;
}

export default function OrderLink(props: IOrderLink) {
  return (
    <a
      href={`/order?rooms=${props.parentState.room}&bedrooms=${props.parentState.bedroom}`}
      className='basis-full transition duration-300  text-white text-lg lg:text-xl 2xl:text-3xl font-medium tracking-widest'
    >
      <div className='flex justify-center items-center p-4 lg:py-7 bg-[#2e5fc7]/90 hover:bg-[#0a40d3] rounded-xl'>
        <p>Policz koszty</p>
        <p className='text-4xl font-extrabold'>&#8594;</p>
      </div>
    </a>
  );
}
