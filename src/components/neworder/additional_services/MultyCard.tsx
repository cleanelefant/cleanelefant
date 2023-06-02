import { ExtendedIAddons } from "../../../types";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

interface IMultyCard {
  item: ExtendedIAddons;
}

function MultyCard({ item }: IMultyCard) {
  const { store } = useContext(Context);
  const [total, setTotal] = React.useState(1);

  const cardMultiplyClickHandler = (
    obj: ExtendedIAddons,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { target } = e;
    if (target) {
      const isButton = (target as HTMLButtonElement).classList.contains(
        "my-button"
      );
      if (isButton) {
        return;
      } else {
        if (obj.isActive) {
          store.deleteItemsWithSameHashFromAddonReciver(obj.hash);
          setTotal(1);
        } else {
          store.addItemToAddonReciver({
            hash: obj.hash,
            title: obj.title,
            price: obj.price,
            src: obj.src,
            minutes: obj.minutes,
          });
        }
        store.setActivityInAddons(obj.hash);
      }
    }
  };

  const buttonDecreaseClickHandler = (obj: ExtendedIAddons) => {
    if (total === 1) {
      store.deleteItemFromAddonReciver(obj.hash);
      store.setActivityInAddons(obj.hash);
    }
    if (total > 1) {
      store.deleteMultyItemFromAddonReciver(obj.hash, total - 1);
      setTotal((t) => t - 1);
    }
  };

  const buttonIncreaseClickHandler = (obj: ExtendedIAddons) => {
    store.addItemToAddonReciver({
      hash: obj.hash,
      title: obj.title,
      price: obj.price,
      multyId: total,
      src: obj.src,
      minutes: obj.minutes,
    });
    setTotal((t) => t + 1);
  };
  return (
    <div
      className={`${
        item.isActive ? "bg-blue-500 text-white" : "bg-white"
      } p-5  drop-shadow-xl  font-bold flex flex-col gap-y-2 justify-center items-center cursor-pointer `}
      key={item.id}
      onClick={(e) => {
        cardMultiplyClickHandler(item, e);
      }}
    >
      <img src={item.src} alt={item.title} width={64} height={64} />
      <p className='text-center'>{item.title}</p>
      <p className='lg:text-xl'>{item.price} zł.</p>
      {item.isActive && (
        <div className='flex items-center justify-center'>
          <button
            className='my-button cursor-pointer p-2 lg:py-3 lg:px-5 border-2 lg:text-2xl'
            onClick={() => {
              buttonDecreaseClickHandler(item);
            }}
          >
            -
          </button>
          <div className='py-2 lg:py-3 px-4 lg:px-6 lg:text-2xl'>{total}</div>
          <button
            className='my-button cursor-pointer p-2 lg:py-3 lg:px-4 border-2 lg:text-2xl'
            onClick={() => {
              buttonIncreaseClickHandler(item);
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default observer(MultyCard);
