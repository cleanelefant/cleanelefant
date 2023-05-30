import React from "react";
//Context
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
//Components
import TimeOrderVisualisator from "./TimeOrderVisualisator";
import AddonsList from "./AddonsList";
//Images

import card from "../../../images/payments/atm-card.png";
import cash from "../../../images/payments/money.png";
import kitchen from "../../../images/services/kitchen.png";
import hallway from "../../../images/services/hallway.png";
import room from "../../../images/services/living-room.png";
import bedroom from "../../../images/services/bedroom.png";

interface IPriceData {
  area_price: number;
  window_price: number;
}

function OrderCard() {
  const { store, orderStore } = useContext(Context);
  const [is_price_data, setIsPriceData] = React.useState(false);
  const [washingPrice, setWashingPrice] = React.useState(0);

  React.useEffect(() => {
    const totalPrise = store.getWashingAddonTotalPrice();
    setWashingPrice(totalPrise);
  }, [store.washingAddonReciver.length]);

  React.useEffect(() => {
    const fetchData = async () => {
      // Imitation data fetching
      const imitationData = await new Promise<IPriceData>((resolve) => {
        setTimeout(() => {
          resolve({
            area_price: 6,
            window_price: 50,
          });
        }, 2000); // Wait for 2 seconds
      });

      store.setAreaPrice(imitationData.area_price);
      store.setWindowPrice(imitationData.window_price);
      setIsPriceData(true);
    };

    fetchData();
  }, []); // Only run once, on mount

  const clickHandler = () => {
    store.errrorHandler();
    store.fetchClientData();
  };

  return (
    <div className='w-full relative mb-5 text-lg'>
      <div className='drop-shadow-xl bg-slate-50 p-4 lg:p-8 lg:fixed xl:w-[600px]'>
        <div>Zamówienie sprzątania obejmuje:</div>
        <div>
          <div className='flex gap-x-2 justify-start items-center'>
            <img src={kitchen} width={20} height={20} />
            <p>
              kuchienka-<span>1</span>
            </p>
          </div>
          <div className='flex gap-x-2 justify-start items-center'>
            <img src={hallway} width={20} height={20} />
            <p>
              przedpokój-<span>1</span>
            </p>
          </div>
          <div className='flex gap-x-2 justify-start items-center'>
            <img src={room} width={20} height={20} />
            <p>
              pokój-<span>{orderStore.rooms}</span>
            </p>
          </div>
          <div className='flex gap-x-2 justify-start items-center'>
            <img src={bedroom} width={20} height={20} />
            <p>
              łazienka-<span>{orderStore.bedrooms}</span>
            </p>
          </div>
        </div>
        <AddonsList />
        <TimeOrderVisualisator />
        <div className='font-bold pt-1 text-2xl'>
          Do zapłaty:{" "}
          {is_price_data
            ? orderStore.calculateTotalPrise(washingPrice) + " zł."
            : "LOADING..."}
          <span className='line-through'>
            {orderStore.actualRate.discount > 0 &&
              " " +
                orderStore.calculateTotalPriseWithoutRate(washingPrice) +
                " zł."}
          </span>
        </div>
        <div className='flex justify-center gap-x-2 '>
          <div className='py-1 px-2 bg-amber-500 text-sm font-bold  mt-2'>
            {store.serviceDay}
          </div>

          {store.time && (
            <div className='py-1 px-2 bg-amber-500 text-sm font-bold  mt-2'>
              {store.time}
            </div>
          )}
        </div>
        <div className='text-center font-mono text-sm lg:text-xl my-2'>
          {store.isCash ? (
            <div className='flex gap-x-1 justify-center items-center'>
              <p>opłata gotówką</p>
              <img src={cash} width={24} height={24} />
            </div>
          ) : (
            <div className='flex gap-x-1 justify-center items-center'>
              <p>opłata kartá</p>
              <img src={card} width={24} height={24} />
            </div>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            onClick={clickHandler}
            className='bg-blue-500 text-white px-8 py-4 font-bold text-2xl flex-1'
          >
            Zamawiam
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(OrderCard);
