import { observer } from "mobx-react-lite";
import { ExtendedIAddons } from "../../../types"

interface ISingleCard {
    item:ExtendedIAddons
    cardClickHandler:(item:ExtendedIAddons)=>void

}



function SingleCard({item,cardClickHandler}:ISingleCard){
    
    return (
        <div
              className={`${
                item.isActive ? "bg-blue-500 text-white" : "bg-white"
              } p-5  drop-shadow-xl sm:w-1/2 md:w-1/4 lg:w-1/5 font-bold flex flex-col gap-y-2 justify-center items-center`}
              key={item.id}
              onClick={() => {
                cardClickHandler(item);
              }}
            >
              <img src={item.src} alt={item.title} width={64} height={64} />
              <p className="text-center">{item.title}</p>
              <p className="lg:text-xl">{item.price} zł.</p>
            </div>
    )

}

export default observer(SingleCard)