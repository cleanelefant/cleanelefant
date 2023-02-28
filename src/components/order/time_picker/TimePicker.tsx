import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import TimeItem from "./TimeItem";
import { ExtendedITime } from "../../../types";

function TimePicker() {
  const { store } = useContext(Context);
  const [times, setTimes] = React.useState<ExtendedITime[]>([]);
  const myRef = React.useRef(null);

  React.useEffect(() => {
    setTimes(store.times);
  }, [store.times]);

  React.useEffect(() => {
    if (store.pageErrors.timeError.isTimeError) {
      myRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      return;
    }
  }, [store.pageErrors.timeError.isTimeError]);

  return (
    <div
      ref={myRef}
      className={`${
        store.pageErrors.timeError.isTimeError
          ? "border-red-500"
          : "border-amber-500"
      } border-4 p-2 basis-1/3`}
    >
      <div className='flex flex-wrap gap-x-3 gap-y-4 cursor-pointer'>
        {times?.map((item) => (
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
