import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import RoomCounter from "./room_counter/RoomCounter";
import BedroomCounter from "./room_counter/BedroomCounter";

function OrderComponent() {
  const { store } = useContext(Context);
  React.useEffect(() => {
    const data = {
      basePrice:80,
      roomPrice:30,
      bedroomPrice:40,
    }
    const queryParams = new URLSearchParams(window.location.search);
    const rooms = queryParams.get("rooms");
    const bedrooms = queryParams.get("bedrooms");
    store.setRooms(Number(rooms));
    store.setBedrooms(Number(bedrooms));
    store.setBasePrice(data.basePrice);
    store.setRoomPrice(data.roomPrice);
    store.setBedPrice(data.bedroomPrice);
    store.calculateTotalPrise()
    
    console.log("useEffect");
  }, []);

  
  return (
    <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-10">
      <div className="basis-3/4">
        <div className="flex  my-2 lg:my-10">
          <button>Osoba prywatna</button> <button>Firma</button>
        </div>
        <div className="uppercase lg:text-3xl font-extrabold text-gray-700">
          TWOJE MIESZKANIE
        </div>

        <div className=" flex flex-col lg:flex-row  flex-wrap gap-y-2 lg:gap-x-10  my-2 lg:my-10">
          <RoomCounter />
          <BedroomCounter />
        </div>
      </div>
      <div className="basis-1/4">      
        <div className="my-10 p-5 text-xl bg-slate-400/75">
          <div>{store.calculateTotalPrise()}</div>          
        </div>
      </div>
    </div>
  );
}
export default observer(OrderComponent);
