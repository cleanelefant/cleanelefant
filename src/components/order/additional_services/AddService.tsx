import React, { useContext } from "react";
import uuid from 'react-uuid';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";
import { IAddons } from "../../../types";
import { IAddonReciver } from "../../../types";


interface ExtendedIAddons extends IAddons {
  isActive: boolean;
  hash: string;
}

function AddServices() {
  const { store } = useContext(Context);
  const [state, setState] = React.useState<ExtendedIAddons[]>();
  React.useEffect(() => {
    if (store.addons) {
      let addons = toJS(store.addons);
      const mapedAddons: ExtendedIAddons[] = addons
        .map((a) => {
          return { ...a, isActive: false, hash:uuid() };
        })
        .filter((a) => a.isOrderPage === true);

      setState(mapedAddons);
    }
  }, [store.addons]);

  const cardClickHandler = (obj:ExtendedIAddons) => {
    if (obj.isActive){
        store.deleteItemFromAddonReciver(obj.hash)
    } else{ store.addItemToAddonReciver({hash:obj.hash, title: obj.title,price:obj.price}) }
    setState((s) => {
      return [...s].map(item=>{
        if(obj.id===item.id){return {...item,isActive:!item.isActive}}
        return item});
    });
  };

  console.log("AddServices", toJS(store.addonReciver));
  return (
    <div>
      <div className="uppercase lg:text-3xl font-extrabold text-gray-700 text-center cursor-pointer">
        Dodaj usługi
      </div>
      <div className="flex flex-wrap gap-4 my-10">
        {state?.map((item) => (
          <div 
                
            className={`${
              item.isActive ? "bg-blue-500 text-white" : "bg-white"
            } p-5  drop-shadow-xl sm:w-1/2 md:w-1/4 lg:w-1/5 font-bold flex flex-col gap-y-2 justify-center items-center`}
            key={item.id}
            onClick={()=>{cardClickHandler(item)}}
          >
            <img src={item.src} alt={item.title} width={64} height={64} />
            <p className="text-center">{item.title}</p>
            <p className="lg:text-xl">{item.price} zł.</p>        
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(AddServices);
