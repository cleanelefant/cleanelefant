import React from "react";

import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";

import card from "../../../images/payments/atm-card.png";
import cash from "../../../images/payments/money.png";
import kitchen from "../../../images/services/kitchen.png";
import hallway from "../../../images/services/hallway.png";
import room from "../../../images/services/living-room.png";
import bedroom from "../../../images/services/bedroom.png";
import { IAddonReciver } from "../../../types";

interface IPriceData {
  area_price: number;
  window_price: number;
}

function OrderCard() {
  const { store } = useContext(Context);
  const [is_price_data, setIsPriceData] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      // Imitation data fetching
      const imitationData = await new Promise<IPriceData>((resolve) => {
        setTimeout(() => {
          resolve({ area_price: 6, window_price: 50 });
        }, 2000); // Wait for 2 seconds
      });
      setIsPriceData(true);
      store.setAreaPrice(imitationData.area_price);
      store.setWindowPrice(imitationData.window_price);
    };

    fetchData();
  }, []); // Only run once, on mount

  const clickHandler = () => {
    store.errrorHandler();
  };

  return (
    <div className='w-full relative '>
      <div className='drop-shadow-xl bg-slate-50 p-4 lg:fixed xl:w-[400px]'>
        <div className='text-center font-bold text-xl'>
          Sprzątanie po remoncie
        </div>
        <div className='font-mono pt-2'>Powierzchnia: {store.area}</div>
        <div className='font-mono pt-1'>Ilość okien: {store.windows}</div>

        <div className='font-bold pt-1'>
          Do zapłaty:{" "}
          {is_price_data ? store.getTotalPrice() + " zł." : "LOADING..."}
          <span className='line-through'>
            {store.ocassionalRate > 0 &&
              " " + store.getTotalPriceWithoutRate() + " zł."}
          </span>
        </div>
        <div className='flex justify-center gap-x-2 '>
          {store.serviceDay && (
            <div className='py-1 px-2 bg-amber-500 text-sm font-bold'>
              {store.serviceDay}
            </div>
          )}
          {store.time && (
            <div className='py-1 px-2 bg-amber-500 text-sm font-bold'>
              {store.time}
            </div>
          )}
        </div>
        <div className='text-center font-mono text-sm my-2'>
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
            className='bg-blue-500 text-white px-4 py-2 font-bold text-2xl'
          >
            Zamawiam
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(OrderCard);
