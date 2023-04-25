import React from "react";

import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";

import card from "../../../images/payments/atm-card.png";
import cash from "../../../images/payments/money.png";
import kitchen from "../../../images/services/kitchen.png";
import hallway from "../../../images/services/hallway.png";
import room from "../../../images/services/living-room.png";
import bedroom from "../../../images/services/bedroom.png";
import { IAddonReciver } from "../../../types";

interface IPriceData {
  area_price: number;
  window_price: number;
}

// function findInArray(addon: IAddonReciver, targetArr: ITarget[]) {
//   const find = targetArr.find((item) => item.hash === addon.hash);
//   return !!find;
// }

function OrderCard() {
  const { store } = useContext(Context);
  const [is_price_data, setIsPriceData] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      // Imitation data fetching
      const imitationData = await new Promise<IPriceData>((resolve) => {
        setTimeout(() => {
          resolve({ area_price: 6, window_price: 50 });
        }, 2000); // Wait for 2 seconds
      });
      setIsPriceData(true);
      store.setAreaPrice(imitationData.area_price);
      store.setWindowPrice(imitationData.window_price);
    };

    fetchData();
  }, []); // Only run once, on mount

  const clickHandler = () => {
    // store.errrorHandler();
  };
  // const addonsArr = toJS(store.addonReciver);
  // const washingAddonsArr = toJS(store.washingAddonReciver);
  // const targetArr: ITarget[] = [];
  // const washingTargetArr: ITarget[] = [];

  // const clickHandler = () => {
  //   store.errrorHandler();
  // };

  // addonsArr.forEach((addon) => {
  //   if (findInArray(addon, targetArr)) {
  //     const index = targetArr.findIndex((item) => item.hash === addon.hash);
  //     targetArr[index].total += 1;
  //   } else {
  //     targetArr.push({
  //       hash: addon.hash,
  //       title: addon.title,
  //       total: 1,
  //       src: addon.src,
  //     });
  //   }
  // });

  // washingAddonsArr.forEach((addon) => {
  //   if (findInArray(addon, washingTargetArr)) {
  //     const index = washingTargetArr.findIndex(
  //       (item) => item.hash === addon.hash
  //     );
  //     washingTargetArr[index].total += 1;
  //   } else {
  //     washingTargetArr.push({
  //       hash: addon.hash,
  //       title: addon.title,
  //       total: 1,
  //       src: addon.src,
  //     });
  //   }
  // });

  // React.useEffect(() => {
  //   store.setTotalMinutes();
  // }, [
  //   store.rooms,
  //   store.bedrooms,
  //   store.addonReciver.length,
  //   store.washingAddonReciver.length,
  // ]);

  // const time = store.setTotalTime();

  return (
    <div className='w-full relative'>
      <div>Sprzątanie po remoncie</div>
      <div>{store.area}</div>
      <div>{store.windows}</div>
      <div>Total:{is_price_data ? store.getTotalPrice() : "LOADING..."}</div>

      <div className='flex justify-center'>
        <button
          onClick={clickHandler}
          className='bg-blue-500 text-white px-4 py-2'
        >
          Zamawiam
        </button>
      </div>
    </div>
  );
}

export default observer(OrderCard);
