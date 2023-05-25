import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../order";
import Counter from "./Counter";
import React from "react";

function BedroomCounter() {
  const { store } = useContext(Context);

  const inc = () => {
    store.increaseBedroom();
  };
  const dec = () => {
    store.decreaseBedroom();
  };
  return (
    <Counter
      title={store.naming.lazienka}
      rooms={store.bedrooms}
      inc={inc}
      dec={dec}
    />
  );
}

export default observer(BedroomCounter);
