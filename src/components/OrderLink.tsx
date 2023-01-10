import React from "react";
import { OrderStateType } from "../types";

interface IOrderLink {
  parentState: OrderStateType;
}

export default function OrderLink(props: IOrderLink) {
  return (
    <div className='basis-full flex justify-center i py-5 lg:py-7 bg-[#2457c6] hover:bg-[#2457c6b9] rounded-xl'>
      <a
        href={`/order?rooms=${props.parentState.room}&bedrooms=${props.parentState.bedroom}`}
        className=' transition duration-300  text-white text-lg lg:text-xl font-bold  '
      >
        Policz koszty<span className='ml-16 text-2xl'>&#8594;</span>
      </a>
    </div>
  );
}
