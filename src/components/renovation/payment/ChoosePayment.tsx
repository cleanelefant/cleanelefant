import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function ChoosePayment() {
  const { store } = useContext(Context);

  const clickHandlerCash = () => {
    store.setIsCash(true);
  };

  const clickHandlerCard = () => {
    store.setIsCash(false);
  };

  return (
    <div className=' mt-20' id='payment_order_page'>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
        WYBIERZ METODĘ PŁATNOŚCI
      </div>

      <div className='grid grid-cols-2 gap-4 my-10  mt-10 justify-center items-center'>
        <div
          onClick={clickHandlerCash}
          className={`${
            store.isCash && "bg-blue-500 text-white drop-shadow-xl"
          } cursor-pointer p-8 font-bold lg:text-2xl text-center bg-white drop-shadow-xl `}
        >
          Gotówką
        </div>
        <div
          onClick={clickHandlerCard}
          className={`${
            !store.isCash && "bg-blue-500 text-white drop-shadow-xl "
          } cursor-pointer p-8 font-bold lg:text-2xl text-center bg-white drop-shadow-xl`}
        >
          Kartą online
        </div>
      </div>
    </div>
  );
}

export default observer(ChoosePayment);
