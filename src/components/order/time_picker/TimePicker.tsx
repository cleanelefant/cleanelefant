import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import TimeItem from "./TimeItem";
import { ExtendedITime } from "../../../types";

function TimePicker() {
  const { store } = useContext(Context);
  const [times,setTimes] = React.useState<ExtendedITime[]>([])

  React.useEffect(()=>{
    setTimes(store.times)
  },[store.times])


  return (
    <div className="w-1/2 my-10">
      <div className="mb-5">Time Picker</div>
      <div className="flex flex-wrap gap-x-3 gap-y-4 cursor-pointer">
        {times?.map(item=><TimeItem key={item.id} item={item} isActive={item.isActive} setTimes={setTimes} />)}        
      </div>
    </div>
  );
}

export default observer(TimePicker);
