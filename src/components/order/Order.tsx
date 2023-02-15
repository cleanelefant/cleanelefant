import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import RoomCounter from "./room_counter/RoomCounter";
import BedroomCounter from "./room_counter/BedroomCounter";
import Launcher from "./launcher/Launcher";
import Rates from "./rates/Rates";
import HomeOption from "./home_option/HomeOption";

import { fetchedRates } from "../../utils/rates";
import { addons } from "../../utils/addons";
import AddService from "./additional_services/AddService";

function OrderComponent() {
  const { store } = useContext(Context);
  React.useEffect(() => {
    const data = {
      basePrice: 80,
      roomPrice: 30,
      bedroomPrice: 40,
    };
    const queryParams = new URLSearchParams(window.location.search);
    const rooms = queryParams.get("rooms");
    const bedrooms = queryParams.get("bedrooms");
    store.setRooms(Number(rooms));
    store.setBedrooms(Number(bedrooms));
    store.setBasePrice(data.basePrice);
    store.setRoomPrice(data.roomPrice);
    store.setBedPrice(data.bedroomPrice);
    const mapedFetchedRates = fetchedRates.map((r, i) => {
      if (i === fetchedRates.length - 1) {
        return { ...r, isCurent: true };
      } else {
        return { ...r, isCurent: false };
      }
    });
    store.setRates(mapedFetchedRates);
    store.setAddons(addons);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-10">
      <div className="basis-3/4">
        <Launcher />
        <div className="uppercase lg:text-3xl font-extrabold text-gray-700 text-center">
          TWOJE MIESZKANIE
        </div>

        <div className=" flex flex-col lg:flex-row  flex-wrap gap-y-2 lg:gap-x-10  my-2 lg:my-10">
          <RoomCounter />
          <BedroomCounter />
        </div>
        <HomeOption />
        <Rates />
        <AddService />
      </div>
      <div className="basis-1/4">
        <div className="lg:relative">
          <div className="my-10 p-5 text-xl bg-white drop-shadow-xl lg:fixed lg:w-1/5">
            <div className="text-center">{store.calculateTotalPrise()} zł.</div>
            <div className="text-center line-through text-lg">
              {store.actualRate !== 1 &&
                store.calculateTotalPriseWithoutRate() + " " + "zł."}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default observer(OrderComponent);
