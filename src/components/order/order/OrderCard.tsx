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
  const addonsArr = toJS(store.addonReciver);
  const washingAddonsArr = toJS(store.washingAddonReciver);
  const targetArr: ITarget[] = [];
  const washingTargetArr: ITarget[] = [];

  const clickHandler = () => {
    store.errrorHandler();
  };

  addonsArr.forEach((addon) => {
    if (findInArray(addon, targetArr)) {
      const index = targetArr.findIndex((item) => item.hash === addon.hash);
      targetArr[index].total += 1;
    } else {
      targetArr.push({
        hash: addon.hash,
        title: addon.title,
        total: 1,
        src: addon.src,
      });
    }
  });

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
    store.setTotalMinutes();
  }, [
    store.rooms,
    store.bedrooms,
    store.addonReciver.length,
    store.washingAddonReciver.length,
  ]);

  const time = store.setTotalTime();

  return (
    <div className='w-full relative'>
      <div className='p-5 text-xl bg-white drop-shadow-xl lg:fixed xl:w-[400px]'>
        <div className='text-center font-mono text-sm'>
          {store.VATvalue > 1 ? "Firma" : "Osoba prywatna"}
        </div>
        <div className='text-center text-2xl font-bold'>
          Do zapłaty: {store.calculateTotalPrise()} zł.
        </div>
        <div className='text-center line-through'>
          {1 - store.actualRate.discount / 100 !== 1 &&
            store.calculateTotalPriseWithoutRate() + " " + "zł."}
        </div>
        <div className='text-center font-mono text-sm'>
          {1 - store.actualRate.discount / 100 !== 1 && store.actualRate.title}
        </div>
        <div className='my-2 text-sm font-bold text-center '>
          <span className='font-normal'>Przybliżony czas pracy</span>{" "}
          {time.hours} {time.hours > 4 ? "godzin " : "godziny "}
          {time.minutes ? time.minutes : null} {time.minutes ? " minut" : null}
        </div>
        <div className='text-center'>Persons:{store.getPersons()}</div>

        <div className='text-sm'>
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
                pokój-<span>{store.rooms}</span>
              </p>
            </div>
            <div className='flex gap-x-2 justify-start items-center'>
              <img src={bedroom} width={20} height={20} />
              <p>
                łazienka-<span>{store.bedrooms}</span>
              </p>
            </div>
          </div>
          {addonsArr.length > 0 && (
            <div className='text-center font-mono text-sm'>
              {targetArr.map((item, index) => (
                <div
                  key={index}
                  className='flex gap-x-2 justify-start items-center'
                >
                  <img src={item.src} width={20} height={20} />
                  <p>
                    {item.title}-<span>{item.total}</span>
                  </p>
                  <div
                    className='cursor-pointer'
                    onClick={() => {
                      // store.deleteItemFromAddonReciver(item.hash);
                      store.deleteItemsWithSameHashFromAddonReciver(item.hash);
                      store.setActivityInAddons(item.hash);
                    }}
                  >
                    &#10060;
                  </div>
                </div>
              ))}
            </div>
          )}
          {washingAddonsArr.length > 0 && (
            <div className='text-center font-mono text-sm'>
              {washingTargetArr.map((item, index) => (
                <div
                  key={index}
                  className='flex gap-x-2 justify-start items-center'
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
        </div>
        <div className='flex justify-center gap-x-2'>
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
        <div className='text-center font-mono text-sm'>
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
            className='bg-blue-500 text-white px-4 py-2'
          >
            Zamiawam
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(OrderCard);
