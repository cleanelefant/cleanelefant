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

  const topRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#payment_order_page");
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.clickStepHandler("#payment_order_page");
      }
    });
    if (topRef.current) {
      observer.observe(topRef.current);
    }
    if (bottomRef.current) {
      bottomObserver.observe(bottomRef.current);
    }
  }, []);

  return (
    <div className=' mt-20' id='payment_order_page' ref={topRef}>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
        WYBIERZ METODĘ PŁATNOŚCI
      </div>

      <div className='grid grid-cols-2 gap-4 my-10 bg-white mt-10'>
        <div
          onClick={clickHandlerCash}
          className={`${
            store.isCash && "bg-blue-500 text-white "
          } cursor-pointer p-8 font-bold text-2xl text-center`}
        >
          Gotówką
        </div>
        <div
          onClick={clickHandlerCard}
          className={`${
            !store.isCash && "bg-blue-500 text-white "
          } cursor-pointer p-8 font-bold text-2xl text-center`}
        >
          Kartą online
        </div>
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
}

export default observer(ChoosePayment);
