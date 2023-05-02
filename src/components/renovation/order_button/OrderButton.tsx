import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function OrderButton() {
  const { store } = useContext(Context);

  const clickHandler = () => {};

  return (
    <div className='my-20 flex justify-center'>
      <button
        onClick={clickHandler}
        className='bg-blue-500 text-white px-20 py-8 font-bold text-4xl'
      >
        Zamawiam za {store.getTotalPrice()}{" "}
        <span className='line-through text-3xl font-light'>
          {store.ocassionalRate > 0 && " " + store.getTotalPriceWithoutRate()}
        </span>{" "}
        zł.
      </button>
    </div>
  );
}

export default observer(OrderButton);
