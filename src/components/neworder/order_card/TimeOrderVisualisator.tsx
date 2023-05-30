import React from "react";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { IAddonReciver } from "../../../types";
import man from "../../../images/man.png";

interface ITimeOrderRateData {
  room_time_price: number;
  bedroom_time_price: number;
  base_time_price: number;
  washing_shift_time: number;
  additional_shift_time: number;
}

interface IStateData {
  hours: number;
  minutes: number;
  persons: number;
}

function DevidedTime(totalTime: number, persons: number) {
  if (persons < 2) {
    return totalTime;
  } else {
    return totalTime / persons;
  }
}

function roundToNext(value: number) {
  if (value === 0) {
    return 0;
  }
  if (value < 10) {
    return 10;
  } else if (value < 20) {
    return 20;
  } else if (value < 30) {
    return 30;
  } else if (value < 45) {
    return 40;
  }
  if (value < 59) {
    return 50;
  }
  return 60;
}

function setPersonal(totalMinutes: number, shiftTime: number) {
  if (totalMinutes && shiftTime) {
    return Math.ceil(totalMinutes / shiftTime);
  } else {
    return null;
  }
}

function convertMinutesToHoursAndMinutes(minutes: number) {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

function setTimeData(
  rooms: number,
  bedrooms: number,
  baseMinute: number,
  roomTimeRate: number,
  bedroomTimeRate: number,
  commonShiftTime: number,
  addons: IAddonReciver[]
  // additionalShiftTime: number
): IStateData {
  const roomMinutes = rooms * roomTimeRate;
  const bedroomMinutes = bedrooms * bedroomTimeRate;
  const addonsMinutes = addons.reduce((sum, addon) => {
    return sum + addon.minutes;
  }, 0);
  const totalMinutes =
    roomMinutes + bedroomMinutes + baseMinute + addonsMinutes;

  //Personal Calculating
  const persons = setPersonal(totalMinutes, commonShiftTime);

  // const washingPersonal = setPersonal(addonsMinutes, additionalShiftTime);

  //Total Time Calculating
  const totalTime = DevidedTime(totalMinutes, persons);
  //  +
  // DevidedTime(addonsMinutes, washingPersonal);

  const convertedTime = convertMinutesToHoursAndMinutes(totalTime);

  return {
    hours: convertedTime.hours,
    minutes: roundToNext(convertedTime.minutes),
    persons: persons,
    //  + washingPersonal
  };
}

function setGodziny(hours: number): string {
  if (hours === 1) {
    return "godzina";
  }
  if (hours > 1 && hours < 5) {
    return "godziny";
  }
  if (hours > 4) {
    return "godzin";
  }
}

function TimeOrderVisualisator() {
  const { store, orderStore } = useContext(Context);
  const [state, setState] = React.useState<IStateData>({
    hours: 0,
    minutes: 0,
    persons: 0,
  });
  const [is_time_rate_data, setIsTimeData] = React.useState(false);
  const [error, setError] = React.useState(null); // Add a state variable for error

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Imitation data fetching
        const imitationData = await new Promise<ITimeOrderRateData>(
          (resolve) => {
            setTimeout(() => {
              resolve({
                room_time_price: 30,
                bedroom_time_price: 60,
                base_time_price: 90,
                washing_shift_time: 480,
                additional_shift_time: 480,
              });
            }, 2000); // Wait for 2 seconds
          }
        );

        orderStore.setBaseMinutes(imitationData.base_time_price);
        orderStore.setRoomMinutes(imitationData.room_time_price);
        orderStore.setBedroomMinutes(imitationData.bedroom_time_price);
        orderStore.setCommonShiftTime(imitationData.washing_shift_time);
        orderStore.setAdditionalShiftTime(imitationData.additional_shift_time);
        setIsTimeData(true);
      } catch (err) {
        // Catch any errors and set the error state
        setError(err.message);
      }
    };

    fetchData();
  }, []); // Only run once, on mount

  React.useEffect(() => {
    if (orderStore.rooms && orderStore.bedrooms) {
      const data: IStateData = setTimeData(
        orderStore.rooms,
        orderStore.bedrooms,
        orderStore.baseMinutes,
        orderStore.roomMinutes,
        orderStore.bedroomMinutes,
        orderStore.commonShiftTime,
        store.washingAddonReciver
      );
      setState(data);
    }
  }, [orderStore.rooms, orderStore.bedrooms, store.washingAddonReciver.length]);
  const personal = Array.from({ length: state.persons }, (v, i) => i);

  if (error) {
    // If there is an error, render it
    return <div>Error: {error}</div>;
  }
  if (!is_time_rate_data) {
    return <div>...LOADING</div>;
  }

  return (
    <div className='font-mono'>
      <div className='pt-1'>
        Przybliżony czas pracy:{" "}
        {`${state.hours ? state.hours : ""} ${
          state.hours ? setGodziny(state.hours) : ""
        }`}{" "}
        {`${state.minutes ? state.minutes : ""} ${
          state.minutes ? "minut" : ""
        }`}
      </div>
      {state.persons > 1 ? (
        <div className='pt-1 flex flex-wrap items-center'>
          Kilkoro sprzątaczy{" "}
          {personal.map((person) => (
            <img key={person} src={man} width={32} height={32} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default observer(TimeOrderVisualisator);
