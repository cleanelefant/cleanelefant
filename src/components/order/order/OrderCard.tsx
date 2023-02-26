import React from "react";

import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

import card from "../../../images/payments/atm-card.png";
import cash from "../../../images/payments/money.png";
import kitchen from "../../../images/services/kitchen.png";
import hallway from "../../../images/services/hallway.png";
import room from "../../../images/services/living-room.png";
import bedroom from "../../../images/services/bedroom.png";

function OrderCard() {
  const { store } = useContext(Context);
  

  return (
    <div className="lg:relative">
      <div className="my-10 p-5 text-xl bg-white drop-shadow-xl lg:fixed lg:w-1/5">
        <div className="text-center font-mono text-sm">
          {store.VATvalue > 1 ? "Firma" : "Osoba prywatna"}
        </div>
        <div className="text-center text-2xl font-bold">      
          Do zapłaty: {store.calculateTotalPrise()} zł.
        </div>
        <div className="text-center line-through">
          {store.actualRate !== 1 &&
            store.calculateTotalPriseWithoutRate() + " " + "zł."}
        </div>

        <div className="text-sm">
          <div>Zamówienie sprzątania obejmuje:</div>
          <div>
            <div className="flex gap-x-2 justify-start items-center">
              <img src={kitchen} width={20} height={20} />
              <p>
                kuchienka-<span>1</span>
              </p>
            </div>
            <div className="flex gap-x-2 justify-start items-center">
              <img src={hallway} width={20} height={20} />
              <p>
                przedpokój-<span>1</span>
              </p>
            </div>
            <div className="flex gap-x-2 justify-start items-center">
              <img src={room} width={20} height={20} />
              <p>
                pokój-<span>{store.rooms}</span>
              </p>
            </div>
            <div className="flex gap-x-2 justify-start items-center">
              <img src={bedroom} width={20} height={20} />
              <p>
                łazienka-<span>{store.bedrooms}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-x-2">
          {store.serviceDay && (
            <div className="py-1 px-2 bg-amber-500 text-sm font-bold">
              {store.serviceDay}
            </div>
          )}
          {store.time && (
            <div className="py-1 px-2 bg-amber-500 text-sm font-bold">
              {store.time}
            </div>
          )}
        </div>
        <div className="text-center font-mono text-sm">
          {store.isCash ? (
            <div className="flex gap-x-1 justify-center items-center">
              <p>opłata gotówką</p>
              <img src={cash} width={24} height={24} />
            </div>
          ) : (
            <div className="flex gap-x-1 justify-center items-center">
              <p>opłata kartá</p>
              <img src={card} width={24} height={24} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(OrderCard);
