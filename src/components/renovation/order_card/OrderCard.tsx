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
import TimeOrderVisualisator from "./TimeOrderVisualisator";

interface IPriceData {
  area_price: number;
  window_price: number;
}

interface ITarget {
  hash: string;
  title: string;
  total: number;
  src: string;
}

function findInArray(addon: IAddonReciver, targetArr: ITarget[]) {
  const find = targetArr.find((item) => item.hash === addon.hash);
  return !!find;
}

function OrderCard() {
  const { store } = useContext(Context);
  const washingAddonsArr = toJS(store.washingAddonReciver);
  const washingTargetArr: ITarget[] = [];
  const [is_price_data, setIsPriceData] = React.useState(false);

  washingAddonsArr.forEach((addon) => {
    if (findInArray(addon, washingTargetArr)) {
      const index = washingTargetArr.findIndex(
        (item) => item.hash === addon.hash
      );
      washingTargetArr[index].total += 1;
    } else {
      washingTargetArr.push({
        hash: addon.hash,
        title: addon.title,
        total: 1,
        src: addon.src,
      });
    }
  });

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

  const renovationPrise = store.getRenovationPrice();
  const washingPrise = store.getWashingPrice();

  return (
    <div className='w-full relative '>
      <div className='drop-shadow-xl bg-slate-50 p-4 lg:fixed xl:w-[400px]'>
        <div className='text-center font-bold text-xl'>
          Sprzątanie po remoncie{" "}
          {renovationPrise ? renovationPrise + " " + "zł" : ""}
        </div>
        {washingPrise ? (
          <div className='text-center font-bold text-xl'>
            Pranie mebli {washingPrise ? washingPrise : ""} zł.
          </div>
        ) : (
          ""
        )}
        {store.pageErrors.comercialDataError.isError && (
          <div className='text-red-500 font-bold'>
            {store.pageErrors.comercialDataError.text}
          </div>
        )}
        <div className='font-mono pt-2'>Powierzchnia: {store.area}</div>
        <div className='font-mono pt-1'>Ilość okien: {store.windows}</div>
        {washingAddonsArr.length > 0 && (
          <div className='text-center font-mono text-sm'>
            {washingTargetArr.map((item, index) => (
              <div
                key={index}
                className='flex gap-x-2 justify-start items-center pt-1'
              >
                <img src={item.src} width={20} height={20} />
                <p>
                  {item.title}-<span>{item.total}</span>
                </p>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    // store.deleteItemFromAddonReciver(item.hash);
                    store.deleteItemsWithSameHashFromWashingAddonReciver(
                      item.hash
                    );
                    store.setActivityInWashingAddons(item.hash);
                  }}
                >
                  &#10060;
                </div>
              </div>
            ))}
          </div>
        )}
        <TimeOrderVisualisator />

        <div className='font-bold pt-1 text-xl'>
          Do zapłaty:{" "}
          {is_price_data ? store.getTotalPrice() + " zł." : "LOADING..."}
          <span className='line-through'>
            {store.ocassionalRate > 0 &&
              " " + store.getTotalPriceWithoutRate() + " zł."}
          </span>
        </div>
        <div className='flex justify-center gap-x-2 '>
          {store.serviceDay && (
            <div className='py-1 px-2 bg-amber-500 text-sm font-bold  mt-2'>
              {store.serviceDay}
            </div>
          )}
          {store.time && (
            <div className='py-1 px-2 bg-amber-500 text-sm font-bold  mt-2'>
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
