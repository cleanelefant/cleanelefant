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
    <div className='bg-white my-5' id='payment_order_page'>
      <div ref={topRef}></div>
      <div>
        <div className='text-3xl text-center font-bold p-5'>
          WYBIERZ METODĘ PŁATNOŚCI
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 my-10'>
        <div
          onClick={clickHandlerCash}
          className={
            store.isCash
              ? "bg-blue-500 text-white cursor-pointer p-4"
              : "cursor-pointer p-4"
          }
        >
          Gotówką
        </div>
        <div
          onClick={clickHandlerCard}
          className={
            store.isCash
              ? "cursor-pointer p-4"
              : "bg-blue-500 text-white cursor-pointer p-4"
          }
        >
          Kartą online
        </div>
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
}

export default observer(ChoosePayment);
