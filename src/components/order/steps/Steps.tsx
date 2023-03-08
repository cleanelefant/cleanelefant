import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function ChoosePayment() {
  const { store } = useContext(Context);

  return (
    <div className='sticky top-0 z-50 flex py-4 bg-gray-300'>
      <div className='basis-1/4 text-center'>1. Wybór usług</div>
      <div className='basis-1/4 text-center'>
        <a href='#datepicker_order_page'>2. Wybór terminu</a>
      </div>
      <div className='basis-1/4 text-center'>3. Adres i dane kontaktowe</div>
      <div className='basis-1/4 text-center'>4. Wybór sposobu opłaty</div>
    </div>
  );
}

export default observer(ChoosePayment);
