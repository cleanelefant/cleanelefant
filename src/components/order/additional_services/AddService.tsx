import React, { useContext } from "react";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";
import { ExtendedIAddons } from "../../../types";
import MultyCard from "./MultyCard";
import SingleCard from "./SingleCard";
import { addons } from "../../../utils/addons";

function AddServices() {
  const { store } = useContext(Context);

  React.useEffect(() => {
    const mapedAddons: ExtendedIAddons[] = addons
      .map((a) => {
        return { ...a, isActive: false, hash: uuid() };
      })
      .filter((a) => a.isOrderPage === true);

    store.setAddons(mapedAddons);
  }, []);

  const cardClickHandler = (obj: ExtendedIAddons) => {
    if (obj.isActive) {
      store.deleteItemFromAddonReciver(obj.hash);
      store.setActivityInAddons(obj.hash);
    } else {
      store.setActivityInAddons(obj.hash);
      store.addItemToAddonReciver({
        hash: obj.hash,
        title: obj.title,
        price: obj.price,
        src: obj.src,
        minutes: obj.minutes,
      });
    }
  };

  console.log("AddServices");
  return (
    <div>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center cursor-pointer'>
        Dodaj usługi
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 my-10'>
        {store.addons?.map((item) => {
          if (item.isMultiply) {
            return <MultyCard key={item.id} item={item} />;
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
    </div>
  );
}

export default observer(AddServices);
