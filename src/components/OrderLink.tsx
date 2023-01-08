import React from "react";
import { OrderStateType } from "../types";

interface IOrderLink {
    parentState:OrderStateType 
}

export default function OrderLink(props: IOrderLink ) {
    return  <a href={`/order?rooms=${props.parentState.room}&bedrooms=${props.parentState.bedroom}`} 
    className="bg-[#2457c6] hover:bg-[#2457c6b9] transition duration-300  text-white text-2xl font-bold px-16 py-7 rounded-xl">Policz koszty<span className="ml-8 text-2xl">&#8594;</span></a>
 
  }