import React, { useContext } from "react";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
//Types
import { ExtendedIAddons, IAddons } from "../../../types";
//Components
import SingleCard from "./SingleCard";
import MultyWashingCard from "./MultyWashingCard";
//hardcode for imitation
import { addons } from "../../../utils/addons";
//images
import arrow from "../../../images/up-arrow.webp";

function AddWashing() {
  const { store } = useContext(Context);
  const [isVisible, setIsVisible] = React.useState(true);
  const [is_addons_data, setIsAddonData] = React.useState(false);
  const [error, setError] = React.useState(null);

  const clickHandler = () => {
    setIsVisible((s) => !s);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Imitation data fetching
        const imitationAddonsData = await new Promise<IAddons[]>((resolve) => {
          setTimeout(() => {
            resolve(addons);
          }, 2000); // Wait for 2 seconds
        });
        const mapedAddons: ExtendedIAddons[] = imitationAddonsData
          .map((a) => {
            return { ...a, isActive: false, hash: uuid() };
          })
          .filter(
            (a) => a.isOrderPage === false && a.isRenovationPage !== false
          );

        store.setWashingAddons(mapedAddons);
        setIsAddonData(true);
      } catch (err) {
        // Catch any errors and set the error state
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const cardClickHandler = (obj: ExtendedIAddons) => {
    if (obj.isActive) {
      store.deleteItemFromWashingAddonReciver(obj.hash);
      store.setActivityInWashingAddons(obj.hash);
    } else {
      store.setActivityInWashingAddons(obj.hash);
      store.addItemToWashingAddonReciver({
        hash: obj.hash,
        title: obj.title,
        price: obj.price,
        src: obj.src,
        minutes: obj.minutes,
      });
    }
  };

  if (error) {
    // If there is an error, render it
    return <div>Error: {error}</div>;
  }
  if (!is_addons_data) {
    return <div>...LOADING</div>;
  }

  return (
    <div className='mt-10 lg:mt-20 border-slate-700 border-4 p-4'>
      <div
        onClick={clickHandler}
        className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center cursor-pointer'
      >
        ZAMÓW CZYSZCZENIE CHEMICZNE MEBLI I DYWANÓW RÓWNOCZEŚNIE ZE SPRZĄTANIEM
      </div>
      <div className='flex justify-center mt-5 cursor-pointer'>
        <img
          onClick={clickHandler}
          className={`${isVisible && "rotate-180"} transition duration-300 `}
          src={arrow}
          alt='arrow'
          width={32}
          height={32}
        />
      </div>
      {isVisible && (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
          {store.washingAddons?.map((item) => {
            if (item.isMultiply) {
              return <MultyWashingCard key={item.id} item={item} />;
            }

            return (
              <SingleCard
                key={item.id}
                item={item}
                cardClickHandler={cardClickHandler}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default observer(AddWashing);
