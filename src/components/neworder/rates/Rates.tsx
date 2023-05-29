import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";
import React from "react";

function Rates() {
  const { store, orderStore } = useContext(Context);
  const rates = toJS(orderStore.rates);
  console.log("Rates");
  return (
    <div className='mt-10 lg:mt-20'>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
        Częstsze sprzątanie - większa zniżka
      </div>
      <div className='text-center'>
        Koszt Twojego następnego zamówienia, jeśli wybierzesz abonament
      </div>
      <div className='flex flex-wrap gap-4  my-2 lg:my-0 lg:mt-10 text-lg lg:text-xl '>
        {rates?.map((rate, index) => (
          <button
            key={rate.id}
            onClick={() => {
              orderStore.changeRatesIsCurentValue(rate.id - 1);
              orderStore.setActualRate(rate);
            }}
            className={`flex-1 py-3 px-8 justify-center items-center  transition-transform drop-shadow-xl rounded ${
              !rate.isCurent ? "bg-white" : "bg-blue-700 text-white"
            }`}
          >
            <div>
              <div>{rate.title}</div>
              {index === rates.length - 1 ? null : (
                <div className='my-4'>
                  <p className='px-4 py-2 text-2xl bg-amber-700 font-bold text-black max-w-fit mx-auto'>
                    -{rate.discount}%
                  </p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default observer(Rates);
