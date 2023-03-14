import React, { useContext } from "react";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ExtendedIAddons } from "../../../types";

import SingleCard from "./SingleCard";
import MultyWashingCard from "./MultyWashingCard";

import { addons } from "../../../utils/addons";

function AddWashing() {
  const { store } = useContext(Context);
  const [isVisible, setIsVisible] = React.useState(false);

  const clickHandler = () => {
    setIsVisible((s) => !s);
  };

  React.useEffect(() => {
    const mapedAddons: ExtendedIAddons[] = addons
      .map((a) => {
        return { ...a, isActive: false, hash: uuid() };
      })
      .filter((a) => a.isOrderPage === false);

    store.setWashingAddons(mapedAddons);
  }, []);

  const cardClickHandler = (obj: ExtendedIAddons) => {
    if (obj.isActive) {
      store.deleteItemFromWashingAddonReciver(obj.hash);
      store.setActivityInWashingAddons(obj.hash);
    } else {
      store.setActivityInWashingAddons(obj.hash);
      store.addItemToWashingAddonReciver({
        hash: obj.hash,
        title: obj.title,
        price: obj.price,
        src: obj.src,
        minutes: obj.minutes,
      });
    }
  };

  return (
    <div className='mt-20 border-slate-700 border-4 p-4'>
      <div
        onClick={clickHandler}
        className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center cursor-pointer'
      >
        ZAMÓW CZYSZCZENIE CHEMICZNE MEBLI I DYWANÓW RÓWNOCZEŚNIE ZE SPRZĄTANIEM
      </div>
      {isVisible && (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
          {store.washingAddons?.map((item) => {
            if (item.isMultiply) {
              return <MultyWashingCard key={item.id} item={item} />;
            }

            return (
              <SingleCard
                key={item.id}
                item={item}
                cardClickHandler={cardClickHandler}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default observer(AddWashing);
