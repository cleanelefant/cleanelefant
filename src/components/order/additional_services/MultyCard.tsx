import { ExtendedIAddons } from "../../../types";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";

interface IMultyCard {
  item: ExtendedIAddons;
  setState: React.Dispatch<React.SetStateAction<ExtendedIAddons[]>>;
}

function MultyCard({ item, setState }: IMultyCard) {
  const { store } = useContext(Context);
  const [total, setTotal] = React.useState(1);

  const cardMultiplyClickHandler = (
    obj: ExtendedIAddons,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { target } = e;
    if (target) {
      const isButton = (target as HTMLButtonElement).classList.contains(
        "my-class"
      );
      if (isButton) {
        return;
      } else {
        if (obj.isActive) {
          store.deleteItemFromAddonReciver(obj.hash);
        } else {
          store.addItemToAddonReciver({
            hash: obj.hash,
            title: obj.title,
            price: obj.price,
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
      }
    }
  };

  const buttonDecreaseClickHandler = (obj: ExtendedIAddons) => {
    if (total === 1) {
      store.deleteItemFromAddonReciver(obj.hash);
      setState((s) => {
        return [...s].map((item) => {
          if (obj.id === item.id) {
            return { ...item, isActive: !item.isActive };
          }
          return item;
        });
      });
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
    });
    setTotal((t) => t + 1);
  };
  return (
    <div
      className={`${
        item.isActive ? "bg-blue-500 text-white" : "bg-white"
      } p-5  drop-shadow-xl sm:w-1/2 md:w-1/4 lg:w-1/5 font-bold flex flex-col gap-y-2 justify-center items-center`}
      key={item.id}
      onClick={(e) => {
        cardMultiplyClickHandler(item, e);
      }}
    >
      <img src={item.src} alt={item.title} width={64} height={64} />
      <p className="text-center">{item.title}</p>
      <p className="lg:text-xl">{item.price} zł.</p>
      {item.isActive && (
        <div className="flex">
          <button
            className="my-class cursor-pointer p-2 border"
            onClick={() => {
              buttonDecreaseClickHandler(item);
            }}
          >
            -
          </button>
          <div className="py-2 px-4">{total}</div>
          <button
            className="my-class cursor-pointer p-2 border"
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