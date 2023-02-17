import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ExtendedIMinutes, ExtendedITime} from "../../../types";
import MinutesItem from "./MinutesItem";

interface IMinutesPicker {
  hour:ExtendedITime
}

function MinutesPicker({hour}:IMinutesPicker) {
  const { store } = useContext(Context);
  const [minutes,setMinutes] = React.useState<ExtendedIMinutes[]>([])

  React.useEffect(()=>{
    setMinutes(store.minutes)
  },[store.times])

  return (
      <div className="flex justify-center gap-x-1 ">
        {minutes?.map(item=><MinutesItem hour={hour} key={item.id} item={item}  setMinutes={setMinutes} />)}        
      </div>
  );
}

export default observer(MinutesPicker);