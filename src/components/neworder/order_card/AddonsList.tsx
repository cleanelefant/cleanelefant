import React from "react";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";
import { IAddonReciver } from "../../../types";

interface ITarget {
  hash: string;
  title: string;
  total: number;
  src: string;
}

function findInArray(addon: IAddonReciver, targetArr: ITarget[]) {
  const find = targetArr.find((item) => item.hash === addon.hash);
  return !!find;
}

function AddonsList() {
  const { store } = useContext(Context);
  const washingAddonsArr = toJS(store.washingAddonReciver);
  const addonsArr = toJS(store.addonReciver);
  const targetArr: ITarget[] = [];
  console.log("targetArr", targetArr);

  washingAddonsArr.forEach((addon) => {
    if (findInArray(addon, targetArr)) {
      const index = targetArr.findIndex((item) => item.hash === addon.hash);
      targetArr[index].total += 1;
    } else {
      targetArr.push({
        hash: addon.hash,
        title: addon.title,
        total: 1,
        src: addon.src,
      });
    }
  });

  addonsArr.forEach((addon) => {
    if (findInArray(addon, targetArr)) {
      const index = targetArr.findIndex((item) => item.hash === addon.hash);
      targetArr[index].total += 1;
    } else {
      targetArr.push({
        hash: addon.hash,
        title: addon.title,
        total: 1,
        src: addon.src,
      });
    }
  });

  React.useEffect(() => {
    const fetchData = async () => {
      // // Imitation data fetching
      // const imitationData = await new Promise<IPriceData>((resolve) => {
      //   setTimeout(() => {
      //     resolve({ area_price: 6, window_price: 50 });
      //   }, 2000); // Wait for 2 seconds
      // });
    };

    fetchData();
  }, []); // Only run once, on mount
  console.log("targetArr", targetArr);
  return (
    <div>
      {washingAddonsArr.length > 0 && (
        <div className='text-center font-mono text-sm'>
          {targetArr.map((item, index) => (
            <div
              key={index}
              className='flex gap-x-2 justify-start items-center pt-1'
            >
              <img src={item.src} width={20} height={20} />
              <p>
                {item.title}-<span>{item.total}</span>
              </p>
              <div
                className='cursor-pointer'
                onClick={() => {
                  store.deleteItemsWithSameHashFromWashingAddonReciver(
                    item.hash
                  );
                  store.setActivityInWashingAddons(item.hash);
                }}
              >
                &#10060;
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default observer(AddonsList);
