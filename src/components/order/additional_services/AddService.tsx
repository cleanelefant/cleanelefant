import React, { useContext } from "react";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";
import { ExtendedIAddons } from "../../../types";
import MultyCard from "./MultyCard";
import SingleCard from "./SingleCard";

function AddServices() {
  const { store } = useContext(Context);
  const [state, setState] = React.useState<ExtendedIAddons[]>();
  React.useEffect(() => {
    if (store.addons) {
      let addons = toJS(store.addons);
      const mapedAddons: ExtendedIAddons[] = addons
        .map((a) => {
          return { ...a, isActive: false, hash: uuid() };
        })
        .filter((a) => a.isOrderPage === true);

      setState(mapedAddons);
    }
  }, [store.addons]);

  const cardClickHandler = (obj: ExtendedIAddons) => {
    if (obj.isActive) {
      store.deleteItemFromAddonReciver(obj.hash);
    } else {
      store.addItemToAddonReciver({
        hash: obj.hash,
        title: obj.title,
        price: obj.price,
        src: obj.src,
      });
    }
    setState((s) => {
      return [...s].map((item) => {
        if (obj.id === item.id) {
          return { ...item, isActive: !item.isActive };
        }
        return item;
      });
    });
  };

  console.log("AddServices");
  return (
    <div>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center cursor-pointer'>
        Dodaj usługi
      </div>
      <div className='flex flex-wrap gap-4 my-10'>
        {state?.map((item) => {
          if (item.isMultiply) {
            return <MultyCard key={item.id} setState={setState} item={item} />;
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
