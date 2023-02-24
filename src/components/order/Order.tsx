import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// Context
import { Context } from "./index";
// Components
import RoomCounter from "./room_counter/RoomCounter";
import BedroomCounter from "./room_counter/BedroomCounter";
import Launcher from "./launcher/Launcher";
import Rates from "./rates/Rates";
import HomeOption from "./home_option/HomeOption";
import AddService from "./additional_services/AddService";
import TimePicker from "./time_picker/TimePicker";
// Data
import { fetchedRates } from "../../utils/rates";
import { addons } from "../../utils/addons";
import { ExtendedIMinutes, ExtendedITime, rateType } from "../../types";
import { times, minutes } from "../../utils/times";
import DatePickear from "./datepicker/Datepicker";
import ContactForm from "./forms/ContactForm";
import AdressForm from "./forms/AdressForm";
import AddWashing from "./additional_services/AddWashing";
import ChoosePayment from "./payment/ChoosePayment";

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
    const discount = queryParams.get("discount");
    store.setRooms(Number(rooms));
    store.setBedrooms(Number(bedrooms));
    store.setBasePrice(data.basePrice);
    store.setRoomPrice(data.roomPrice);
    store.setBedPrice(data.bedroomPrice);
    store.setAddons(addons);

    // prepare data for TimePicker
    const mapedTimes: ExtendedITime[] = times.map((t) => {
      return { ...t, isActive: false, isModal: false };
    });
    store.setTimes(mapedTimes);
    const mapedMinutes: ExtendedIMinutes[] = minutes.map((m) => {
      return { ...m, isActive: false };
    });
    store.setMinutes(mapedMinutes);

    let mapedFetchedRates: rateType[] = [];
    if (!discount) {
      mapedFetchedRates = fetchedRates.map((r, i) => {
        if (i === fetchedRates.length - 1) {
          return { ...r, isCurent: true };
        } else {
          return { ...r, isCurent: false };
        }
      });
    } else {
      const findDiscount = fetchedRates.find((d) => d.link === discount);
      if (findDiscount) {
        mapedFetchedRates = fetchedRates.map((r, i) => {
          if (r.link === findDiscount.link) {
            store.setActualRate(r.discount);
            return { ...r, isCurent: true };
          } else {
            return { ...r, isCurent: false };
          }
        });
      } else {
        mapedFetchedRates = fetchedRates.map((r, i) => {
          if (i === fetchedRates.length - 1) {
            return { ...r, isCurent: true };
          } else {
            return { ...r, isCurent: false };
          }
        });
      }
    }
    store.setRates(mapedFetchedRates);
  }, []);

  return (
    <div className='flex flex-col lg:flex-row gap-y-10 lg:gap-x-10'>
      <div className='basis-3/4'>
        <Launcher />
        <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
          TWOJE MIESZKANIE
        </div>

        <div className=' flex flex-col lg:flex-row  flex-wrap gap-y-2 lg:gap-x-10  my-2 lg:my-10'>
          <RoomCounter />
          <BedroomCounter />
        </div>
        <HomeOption />
        <Rates />
        <AddService />
        <div className='flex flex-col 2xl:flex-row gap-x-5'>
          <DatePickear />
          <TimePicker />
        </div>
        <AddWashing />
        <AdressForm />
        <ContactForm />
        <ChoosePayment />
      </div>
      <div className='basis-1/4'>
        <div className='lg:relative'>
          <div className='my-10 p-5 text-xl bg-white drop-shadow-xl lg:fixed lg:w-1/5'>
            <div className='text-center'>{store.calculateTotalPrise()} zł.</div>
            <div className='text-center line-through text-lg'>
              {store.actualRate !== 1 &&
                store.calculateTotalPriseWithoutRate() + " " + "zł."}{" "}
            </div>
            <div className='flex gap-x-2'>
              <div>{store.serviceDay && store.serviceDay}</div>
              <div>{store.time && store.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default observer(OrderComponent);
