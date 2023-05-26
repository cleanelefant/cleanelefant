import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Counter from "./Counter";
import React from "react";

function BedroomCounter() {
  const { store, orderStore } = useContext(Context);

  const inc = () => {
    orderStore.increaseBedroom();
  };
  const dec = () => {
    orderStore.decreaseBedroom();
  };
  return (
    <Counter
      title={orderStore.naming.lazienka}
      rooms={orderStore.bedrooms}
      inc={inc}
      dec={dec}
    />
  );
}

export default observer(BedroomCounter);
