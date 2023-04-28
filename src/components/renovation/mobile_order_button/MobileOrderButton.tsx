import React from "react";

import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

function MobileOrderButton() {
  const { store } = useContext(Context);

  const clickHandler = () => {
    store.errrorHandler();
  };

  return (
    <div className='fixed bottom-2 left-0 right-0 lg:hidden flex justify-center font-bold text-xl '>
      <button
        onClick={clickHandler}
        className='flex-1  py-4 px-4 bg-blue-500 text-white flex justify-center gap-x-2 mx-4'
      >
        <div className='font-bold pt-1'>
          Do zapłaty: {store.getTotalPrice() + " zł."}
          <span className='line-through'>
            {store.ocassionalRate > 0 &&
              " " + store.getTotalPriceWithoutRate() + " zł."}
          </span>
        </div>
      </button>
    </div>
  );
}

export default observer(MobileOrderButton);
