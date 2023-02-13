import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import RoomCounter from "./room_counter/RoomCounter";
import BedroomCounter from "./room_counter/BedroomCounter";

function OrderComponent() {
  const { store } = useContext(Context);
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const rooms = queryParams.get("rooms");
    const bedrooms = queryParams.get("bedrooms");
    store.setRooms(Number(rooms));
    store.setBedrooms(Number(bedrooms));
    console.log("useEffect");
  }, []);
  return (
    <div className='flex gap-x-5'>
      <div className='basis-3/4 flex gap-x-10 my-10'>
        <RoomCounter />
        <BedroomCounter />
      </div>
      <div className='text-xl basis-1/4 my-10'>
        <div>{store.rooms}</div>
        <div>{store.bedrooms}</div>
      </div>
    </div>
  );
}
export default observer(OrderComponent);
