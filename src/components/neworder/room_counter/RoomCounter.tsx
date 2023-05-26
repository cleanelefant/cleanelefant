import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Counter from "./Counter";

function RoomCounter() {
  const { store, orderStore } = useContext(Context);
  console.log("RoomCounter");
  const inc = () => {
    orderStore.increaseRoom();
  };
  const dec = () => {
    orderStore.decreaseRoom();
  };

  return (
    <Counter
      title={orderStore.naming.pokoj}
      rooms={orderStore.rooms}
      inc={inc}
      dec={dec}
    />
  );
}

export default observer(RoomCounter);
