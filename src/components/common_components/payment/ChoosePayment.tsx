import React from "react";
import money from "../../../images/money.png";
import card from "../../../images/credit-card.png";

interface IChoosePayment {
  setIsCash(value: boolean): void;
  isCash: boolean;
}

function ChoosePayment({ setIsCash, isCash }: IChoosePayment) {
  const clickHandlerCash = () => {
    setIsCash(true);
  };

  const clickHandlerCard = () => {
    setIsCash(false);
  };

  return (
    <div className=' mt-20' id='payment_order_page'>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
        WYBIERZ METODĘ PŁATNOŚCI
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-10  mt-10 justify-center items-center'>
        <div
          onClick={clickHandlerCash}
          className={`${
            isCash && "bg-blue-500 text-white drop-shadow-xl"
          } cursor-pointer p-4 lg:p-8 font-bold lg:text-2xl text-center bg-white drop-shadow-xl flex gap-x-4 justify-center items-center`}
        >
          <img src={money} width={64} height={64} />
          <p>Gotówką</p>
        </div>
        <div
          onClick={clickHandlerCard}
          className={`${
            !isCash && "bg-blue-500 text-white drop-shadow-xl "
          } cursor-pointer p-4 lg:p-8 font-bold lg:text-2xl text-center bg-white drop-shadow-xl flex gap-x-4 justify-center items-center`}
        >
          <img src={card} width={64} height={64} />
          <p>Kartą online</p>
        </div>
      </div>
    </div>
  );
}

export default ChoosePayment;
