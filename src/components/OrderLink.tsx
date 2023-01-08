import React from "react";
import { OrderStateType } from "../types";

interface IOrderLink {
    parentState:OrderStateType 
}

export default function OrderLink(props: IOrderLink ) {
    
     

 
    return <div className="border-black border-2">
        <p>{props.parentState.room}</p> 
        <p>{props.parentState.bedroom}</p>   
        <a href={`/order?rooms=${props.parentState.room}&bedrooms=${props.parentState.bedroom}`}>Policz koszty</a>
    </div>;
  }