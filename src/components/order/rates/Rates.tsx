import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";

function Rates() {
  const { store } = useContext(Context);
  const rates = toJS(store.rates);
  console.log("Rates");
  return (
    <div>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
        Częstsze sprzątanie - większa zniżka
      </div>
      <div className='text-center'>
        Koszt Twojego następnego zamówienia, jeśli wybierzesz abonament
      </div>
      <div className='flex flex-wrap gap-4  my-2 lg:my-10 text-lg lg:text-xl '>
        {rates?.map((rate, index) => (
          <button
            key={rate.id}
            onClick={() => {
              store.changeRatesIsCurentValue(rate.id - 1);
              store.setActualRate(rate);
            }}
            className={`flex-1 py-6 px-8 justify-center items-center  transition-transform drop-shadow-xl rounded ${
              !rate.isCurent ? "bg-white" : "bg-blue-700 text-white"
            }`}
          >
            <div>
              <div>{rate.title}</div>
              {index === rates.length - 1 ? null : (
                <div className='my-4'>
                  <p className='bg-orange-700 py-2 px-4 max-w-fit mx-auto'>
                    -{rate.discount}
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
