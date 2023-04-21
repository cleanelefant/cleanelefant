import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import TimeItem from "./TimeItem";
import { ExtendedIMinutes, ExtendedITime } from "../../../types";
import { minutes, times } from "../../../utils/times";

function TimePicker() {
  const { store } = useContext(Context);
  const [mtimes, setTimes] = React.useState<ExtendedITime[]>([]);

  React.useEffect(() => {
    const mapedTimes: ExtendedITime[] = times.map((t) => {
      return { ...t, isActive: false, isModal: false };
    });
    store.setTimes(mapedTimes);
    setTimes(mapedTimes);
  }, []);

  return (
    <div
      id='timepicker_order_page'
      className={`${
        store.pageErrors.timeError.isError
          ? "border-red-500 border-4"
          : "text-gray-700"
      } border-2 p-2 basis-1/3`}
    >
      <div className='flex flex-wrap gap-x-3 gap-y-4 cursor-pointer'>
        {mtimes?.map((item) => (
          <TimeItem
            key={item.id}
            item={item}
            isActive={item.isActive}
            setTimes={setTimes}
          />
        ))}
      </div>
    </div>
  );
}

export default observer(TimePicker);
