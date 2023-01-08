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
    <div className="md:flex gap-x-5 flex items-center justify-center mx-auto   mt-24">
        <OrderButton min={1} title={"pokój"} foo={setRoom} />
        <OrderButton min={1} title={"łazienka"} foo={setBedroom} />
        <OrderLink parentState={state}/>        
    </div>
  );
}
