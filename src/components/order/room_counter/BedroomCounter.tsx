import {  useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import Counter from "./Counter";

function BedroomCounter() {
  const { store } = useContext(Context);
  console.log("BedroomCounter");
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
