import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function OrderButton() {
  const { store, orderStore } = useContext(Context);
  const [washingPrice, setWashingPrice] = React.useState(0);

  React.useEffect(() => {
    const totalPrise = store.getWashingAddonTotalPrice();
    setWashingPrice(totalPrise);
  }, [store.washingAddonReciver.length]);

  const clickHandler = () => {
    store.errrorHandler();
    store.fetchClientData();
  };

  return (
    <div className='hidden  my-20 lg:flex justify-center'>
      <button
        onClick={clickHandler}
        className='bg-blue-500 text-white px-20 py-8 font-bold text-4xl'
      >
        Zamawiam za {orderStore.calculateTotalPrise(washingPrice)} zł.
        <span className='line-through text-3xl font-light'>
          {orderStore.actualRate.discount > 0 &&
            " " +
              orderStore.calculateTotalPriseWithoutRate(washingPrice) +
              " " +
              "zł"}
        </span>
        {store.pageErrors.comercialDataError.isError && (
          <div className='text-red-500 font-bold text-sm'>
            {store.pageErrors.comercialDataError.text}
          </div>
        )}
      </button>
    </div>
  );
}

export default observer(OrderButton);
