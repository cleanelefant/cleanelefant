import React from "react";
import OrderButton from "./OrderButton";
import OrderLink from "./OrderLink";
import { OrderStateType } from "../types";

export default function OrderNavigator() {
  const [state, setState] = React.useState<OrderStateType>({ room: 1, bedroom: 1 });

  const setRoom = (value: number) => {
    setState({ ...state, room: value });
  };
  const setBedroom = (value: number) => {
    setState({ ...state, bedroom: value });
  };

  return (
    <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0">
    
        <OrderButton min={1} title={"pokój"} foo={setRoom} />
        <OrderButton min={1} title={"łazienka"} foo={setBedroom} />
        <OrderLink parentState={state}/>        
      
    </figure>
  );
}
