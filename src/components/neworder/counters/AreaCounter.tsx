import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import React from "react";

function AreaCounter() {
  const { store } = useContext(Context);
  return (
    <div className='flex flex-1 gap-x-2 items-stretch justify-between text-lg lg:text-2xl font-bold bg-slate-50 drop-shadow-xl'>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          store.decreaseArea();
        }}
      >
        -
      </button>
      <div className='flex  gap-x-2 justify-center items-center py-6'>
        <input
          value={store.area ? store.area : "Powierzchnia"}
          // style={{
          //   width:
          //     store.area === 0
          //       ? "120px"
          //       : `${(store.area.toString().length + 1) * 14}px`,
          // }}
          maxLength={255}
          className={`focus:outline-none text-center w-[120px]  bg-slate-50 ${
            store.area === 0 ? "text-lg" : "text-2xl"
          }`}
          onChange={(e) => {
            store.setArea(e);
            const total = store.getTotalPrice();
            if (total > 199) {
              store.setCommercialDataError(false);
            }
          }}
        />

        <p className={` ${store.area === 0 ? "text-lg" : "text-2xl"}`}>m2</p>
      </div>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          store.increaseArea();
          const total = store.getTotalPrice();
          if (total > 199) {
            store.setCommercialDataError(false);
          }
        }}
      >
        +
      </button>
    </div>
  );
}
export default observer(AreaCounter);
