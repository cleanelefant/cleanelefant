import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ExtendedITime } from "../../../types";
import MinutesPicker from "./MinutesPicker";

interface ITimeItem {
    item: ExtendedITime;
    isActive: boolean;
    setTimes: React.Dispatch<React.SetStateAction<ExtendedITime[]>>;
}

function TimeItem({ item, isActive, setTimes}: ITimeItem) {
  

    const timeMouseOnHandler = (item: ExtendedITime) => {
      
        setTimes((t) => {
            return [...t].map((time) => {
                if (time.id === item.id) {
                    return { ...time, isModal: true };
                } else {
                    return { ...time, isModal: false };
                }
            });
        });

    }
    return (
        <div          
            onMouseEnter={()=>{timeMouseOnHandler(item)}}
            className={`relative px-4 py-2 font-medium rounded ${isActive ? "bg-blue-500 text-white" : "bg-slate-500"
                }`}
        >
            {item.hours}:{item.minutes}
            {item.isModal&&<div className=" p-1 absolute top-6 z-40"><MinutesPicker hour={item}/></div>}
        </div>
    );
}

export default observer(TimeItem);
