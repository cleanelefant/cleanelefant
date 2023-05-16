import React from "react";
//Context
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
//Components
import TimeOrderVisualisator from "./TimeOrderVisualisator";
import AddonsList from "./AddonsList";
//Images
import card from "../../../images/payments/atm-card.png";
import cash from "../../../images/payments/money.png";

interface IPriceData {
  area_price: number;
  window_price: number;
  washing_shift_time: number;
  additional_shift_time: number;
}

function OrderCard() {
  const { store } = useContext(Context);
  const [is_price_data, setIsPriceData] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      // Imitation data fetching
      const imitationData = await new Promise<IPriceData>((resolve) => {
        setTimeout(() => {
          resolve({
            area_price: 6,
            window_price: 50,
            washing_shift_time: 480,
            additional_shift_time: 480,
          });
        }, 2000); // Wait for 2 seconds
      });

      store.setAreaPrice(imitationData.area_price);
      store.setWindowPrice(imitationData.window_price);
      store.setCommonShiftTime(imitationData.washing_shift_time);
      store.setAdditionalShiftTime(imitationData.additional_shift_time);
      setIsPriceData(true);
    };

    fetchData();
  }, []); // Only run once, on mount

  const clickHandler = () => {
    store.errrorHandler();
    store.fetchClientData();
  };

  const renovationPrise = store.getRenovationPrice();
  const washingPrise = store.getWashingPrice();

  return (
    <div className='w-full relative mb-5 text-lg'>
      <div className='drop-shadow-xl bg-slate-50 p-4 lg:p-8 lg:fixed xl:w-[600px]'>
        <div className=' font-bold text-xl'>
          Sprzątanie po remoncie{" "}
          {renovationPrise ? renovationPrise + " " + "zł." : ""}
        </div>
        {washingPrise ? (
          <div className=' font-bold text-xl'>
            Pranie mebli {washingPrise ? washingPrise : ""} zł.
          </div>
        ) : (
          ""
        )}
        {store.pageErrors.comercialDataError.isError && (
          <div className='text-red-500 font-bold'>
            {store.pageErrors.comercialDataError.text}
          </div>
        )}
        <div className='font-mono pt-2'>Powierzchnia: {store.area} m2</div>
        <div className='font-mono pt-1'>Ilość okien: {store.windows}</div>
        <AddonsList />
        <TimeOrderVisualisator />
        <div className='font-bold pt-1 text-2xl'>
          Do zapłaty:{" "}
          {is_price_data ? store.getTotalPrice() + " zł." : "LOADING..."}
          <span className='line-through'>
            {store.ocassionalRate > 0 &&
              " " + store.getTotalPriceWithoutRate() + " zł."}
          </span>
        </div>
        <div className='flex justify-center gap-x-2 '>
          {store.serviceDay && (
            <div className='py-1 px-2 bg-amber-500 text-sm font-bold  mt-2'>
              {store.serviceDay}
            </div>
          )}
          {store.time && (
            <div className='py-1 px-2 bg-amber-500 text-sm font-bold  mt-2'>
              {store.time}
            </div>
          )}
        </div>
        <div className='text-center font-mono text-sm lg:text-xl my-2'>
          {store.isCash ? (
            <div className='flex gap-x-1 justify-center items-center'>
              <p>opłata gotówką</p>
              <img src={cash} width={24} height={24} />
            </div>
          ) : (
            <div className='flex gap-x-1 justify-center items-center'>
              <p>opłata kartá</p>
              <img src={card} width={24} height={24} />
            </div>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            onClick={clickHandler}
            className='bg-blue-500 text-white px-8 py-4 font-bold text-2xl flex-1'
          >
            Zamawiam
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(OrderCard);
