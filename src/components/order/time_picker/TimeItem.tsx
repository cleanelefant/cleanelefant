import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ExtendedITime } from "../../../types";

interface ITimeItem {
    item: ExtendedITime;
    isActive: boolean;
    setTimes: React.Dispatch<React.SetStateAction<ExtendedITime[]>>;
   
}

function TimeItem({ item, isActive, setTimes}: ITimeItem) {
    const { store } = useContext(Context);
   
    const timeClickHandler = (item: ExtendedITime) => {
        if (item.isActive) {
            store.setTime('')
            setTimes((t) => {
                return [...t].map((time) => {

                    return { ...time, isActive: false };

                });
            });
        } else {
            store.setTime(`${item.hours}:${item.minutes}`)
            setTimes((t) => {
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
    const timeMouseOnHandler = (item: ExtendedITime) => {
        console.log("timeMouseOnHandler")
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
            onClick={() => {
                timeClickHandler(item);
            }}
            onMouseEnter={()=>{timeMouseOnHandler(item)}}
            className={`relative px-4 py-2 font-medium rounded ${isActive ? "bg-blue-500 text-white" : "bg-slate-500"
                }`}
        >
            {item.hours}:{item.minutes}
            {item.isModal&&<div className="bg-red-500 p-1 absolute z-40">Modal</div>}
        </div>
    );
}

export default observer(TimeItem);
