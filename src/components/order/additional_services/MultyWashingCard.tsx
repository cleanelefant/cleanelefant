import { ExtendedIAddons } from "../../../types";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

interface IMultyCard {
  item: ExtendedIAddons;
}

function MultyWashingCard({ item }: IMultyCard) {
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
          store.deleteItemsWithSameHashFromWashingAddonReciver(obj.hash);
          setTotal(1);
        } else {
          store.addItemToWashingAddonReciver({
            hash: obj.hash,
            title: obj.title,
            price: obj.price,
            src: obj.src,
            minutes: obj.minutes,
          });
        }
        store.setActivityInWashingAddons(obj.hash);
      }
    }
  };

  const buttonDecreaseClickHandler = (obj: ExtendedIAddons) => {
    if (total === 1) {
      store.deleteItemFromWashingAddonReciver(obj.hash);
      store.setActivityInWashingAddons(obj.hash);
    }
    if (total > 1) {
      store.deleteMultyItemFromWashingAddonReciver(obj.hash, total - 1);
      setTotal((t) => t - 1);
    }
  };

  const buttonIncreaseClickHandler = (obj: ExtendedIAddons) => {
    store.addItemToWashingAddonReciver({
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
      } p-5  drop-shadow-xl  font-bold flex flex-col gap-y-2 justify-center items-center `}
      key={item.id}
      onClick={(e) => {
        cardMultiplyClickHandler(item, e);
      }}
    >
      <img src={item.src} alt={item.title} width={64} height={64} />
      <p className='text-center'>{item.title}</p>
      <p className='lg:text-xl'>{item.price} zł.</p>
      {item.isActive && (
        <div className='flex'>
          <button
            className='my-button cursor-pointer p-2 border'
            onClick={() => {
              buttonDecreaseClickHandler(item);
            }}
          >
            -
          </button>
          <div className='py-2 px-4'>{total}</div>
          <button
            className='my-button cursor-pointer p-2 border'
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

export default observer(MultyWashingCard);
