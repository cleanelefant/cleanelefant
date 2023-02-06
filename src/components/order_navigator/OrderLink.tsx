import React from "react";
import { OrderStateType } from "../../types";

interface IOrderLink {
  parentState: OrderStateType;
}

export default function OrderLink(props: IOrderLink) {
  return (
    <a
      href={`/order?rooms=${props.parentState.room}&bedrooms=${props.parentState.bedroom}`}
      className='basis-full transition duration-300  text-white text-lg lg:text-2xl font-medium tracking-widest'
    >
      <div className=' flex justify-center items-center i py-4 lg:py-7 bg-[#2457c6] hover:bg-[#2457e8] rounded-xl'>
        Policz koszty
        <span className='ml-16 text-2xl font-extrabold'>&#8594;</span>
      </div>
    </a>
  );
}
