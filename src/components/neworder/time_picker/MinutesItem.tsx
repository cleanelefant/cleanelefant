import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ExtendedIMinutes, ExtendedITime } from "../../../types";

interface IMinutesItem {
  item: ExtendedIMinutes;
  setMinutes: React.Dispatch<React.SetStateAction<ExtendedIMinutes[]>>;
  hour: ExtendedITime;
}

function MinutesItem({ item, hour, setMinutes }: IMinutesItem) {
  const { store } = useContext(Context);

  const minutesClickHandler = (
    item: ExtendedIMinutes,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (item.isActive) {
      store.setTime("");
      setMinutes((t) => {
        return [...t].map((time) => {
          return { ...time, isActive: false };
        });
      });
    } else {
      store.setTime(`${hour.hours}:${item.value}`);
      store.setTimePickerError(false);
      setMinutes((t) => {
        return [...t].map((time) => {
          if (time.id === item.id) {
            return { ...time, isActive: true };
          } else {
            return { ...time, isActive: false };
          }
        });
      });
    }
  };

  return (
    <div
      onClick={(e) => {
        minutesClickHandler(item, e);
      }}
      className={`minutesButton p-2 ${
        item.isActive ? "bg-blue-500 text-white " : "bg-red-500"
      }`}
    >
      {item.value}
    </div>
  );
}

export default observer(MinutesItem);
