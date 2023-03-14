import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// Context
import { Context } from "./index";
//Types
import { ExtendedIMinutes, ExtendedITime, rateType } from "../../types";
// Components
import RoomCounter from "./room_counter/RoomCounter";
import BedroomCounter from "./room_counter/BedroomCounter";
import Launcher from "./launcher/Launcher";
import Rates from "./rates/Rates";
import HomeOption from "./home_option/HomeOption";
import AddService from "./additional_services/AddService";
import TimePicker from "./time_picker/TimePicker";
import DatePickear from "./datepicker/Datepicker";
import ContactForm from "./forms/ContactForm";
import AdressForm from "./forms/AdressForm";
import AddWashing from "./additional_services/AddWashing";
import ChoosePayment from "./payment/ChoosePayment";
import OrderCard from "./order/OrderCard";
// Data
import { fetchedRates } from "../../utils/rates";
import { times, minutes } from "../../utils/times";
import Steps from "./steps/Steps";
import { steps } from "./../../utils/data/steps";

function OrderComponent() {
  const { store } = useContext(Context);
  React.useEffect(() => {
    const data = {
      basePrice: 80,
      baseMinutes: 90,
      roomPrice: 30,
      roomMinutes: 30,
      bedroomPrice: 40,
      bedroomsMinutes: 60,
    };
    const queryParams = new URLSearchParams(window.location.search);
    const rooms = queryParams.get("rooms");
    const bedrooms = queryParams.get("bedrooms");
    const discount = queryParams.get("discount");

    if (Number(rooms)) {
      console.log(Number(rooms));
      store.setRooms(Number(rooms));
    }
    if (Number(bedrooms)) {
      store.setBedrooms(Number(bedrooms));
    }
    store.setBasePrice(data.basePrice);
    store.setRoomPrice(data.roomPrice);
    store.setBedPrice(data.bedroomPrice);
    store.setBaseMinutes(data.baseMinutes);
    store.setRoomMinutes(data.roomMinutes);
    store.setBedroomMinutes(data.bedroomsMinutes);
    store.setSteps(steps);

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
            store.setActualRate(r);
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

  const topContactRef = React.useRef<HTMLDivElement>(null);
  const bottomContactRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#adress_order_page");
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#adress_order_page");
      }
    });
    if (topContactRef.current) {
      observer.observe(topContactRef.current);
    }
    if (bottomContactRef.current) {
      bottomObserver.observe(bottomContactRef.current);
    }
  }, []);

  const topTimeRef = React.useRef<HTMLDivElement>(null);
  const bottomTimeRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#datepicker_order_page");
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#datepicker_order_page");
      }
    });
    if (topTimeRef.current) {
      console.log("topTimeRef.current", topTimeRef.current);
      observer.observe(topTimeRef.current);
    }
    if (bottomTimeRef.current) {
      bottomObserver.observe(bottomTimeRef.current);
    }
  }, []);

  const topServiceRef = React.useRef<HTMLDivElement>(null);
  const bottomServiceRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#countres_order_page");
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#countres_order_page");
      }
    });
    if (topServiceRef.current) {
      observer.observe(topServiceRef.current);
    }
    if (bottomServiceRef.current) {
      bottomObserver.observe(bottomServiceRef.current);
    }
  }, []);

  return (
    <div className='scroll-smooth'>
      <Steps />
      <div className='mx-4 lg:mx-10'>
        <h1 className='text-lg my-10 lg:text-4xl font-extrabold uppercase text-center'>
          Sprzątanie mieszkania Zielona Góra
        </h1>
        <div className='flex flex-col lg:flex-row justify-center gap-y-10 lg:gap-x-10'>
          <div className='basis-3/4'>
            <Launcher />
            <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center mt-20'>
              TWOJE MIESZKANIE
            </div>
            <div ref={topServiceRef}></div>
            <div
              className=' flex flex-col lg:flex-row  flex-wrap gap-y-2 lg:gap-x-10  my-2 lg:mt-10 lg:mb-2'
              id='countres_order_page'
            >
              <RoomCounter />
              <BedroomCounter />
            </div>
            <div className='text-center text-slate-600 text-lg'>
              * Kompleksowe sprzątanie całego mieszkania, w tym kuchni, toalety
              oraz łazienki
            </div>
            <HomeOption />
            <Rates />
            <AddService />
            <div ref={bottomServiceRef}></div>
            <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center mt-20'>
              Wybór terminu
            </div>
            <div
              className='flex flex-col 2xl:flex-row gap-x-5 mt-10'
              id='datepicker_order_page '
            >
              <div ref={topTimeRef}></div>

              <DatePickear />
              <TimePicker />
              <div ref={bottomTimeRef}></div>
            </div>
            <AddWashing />
            <div id='adress_order_page'>
              <div ref={topContactRef}></div>
              <AdressForm />
              <ContactForm />
              <div ref={bottomContactRef}></div>
            </div>
            <ChoosePayment />
          </div>
          <div className='basis-1/4 flex '>
            <OrderCard />
          </div>
        </div>
      </div>
    </div>
  );
}
export default observer(OrderComponent);
