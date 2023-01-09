import React from "react";
import OrderButton from "./OrderButton";
import OrderLink from "./OrderLink";
import { OrderStateType } from "../types";

export default function OrderNavigator() {
  const [state, setState] = React.useState<OrderStateType>({
    room: 1,
    bedroom: 1,
  });

  const setRoom = (value: number) => {
    setState({ ...state, room: value });
  };
  const setBedroom = (value: number) => {
    setState({ ...state, bedroom: value });
  };

  return (
    <div className='w-11/12 md:w-4/5 mx-auto flex gap-y-5 lg:gap-y-0 lg:gap-x-5 flex-col lg:flex-row lg:mt-24'>
      <OrderButton min={1} title={"pokój"} foo={setRoom} />
      <OrderButton min={1} title={"łazienka"} foo={setBedroom} />
      <OrderLink parentState={state} />
    </div>
  );
}
