import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../order";
import Counter from "./Counter";

function RoomCounter() {
  const { store } = useContext(Context);
  console.log("RoomCounter");
  const inc = () => {
    store.increaseRoom();
  };
  const dec = () => {
    store.decreaseRoom();
  };

  return (
    <Counter
      title={store.naming.pokoj}
      rooms={store.rooms}
      inc={inc}
      dec={dec}
    />
  );
}

export default observer(RoomCounter);
