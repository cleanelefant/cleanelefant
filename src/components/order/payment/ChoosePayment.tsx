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
    <div className='bg-white my-5'>
      <div>
        <div className='text-3xl text-center font-bold p-5'>
          WYBIERZ METODĘ PŁATNOŚCI
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div
          onClick={clickHandlerCash}
          className={store.isCash ? "bg-blue-500 text-white" : ""}
        >
          Gotówką
        </div>
        <div
          onClick={clickHandlerCard}
          className={store.isCash ? "" : "bg-blue-500 text-white"}
        >
          Kartą online
        </div>
      </div>
    </div>
  );
}

export default observer(ChoosePayment);
