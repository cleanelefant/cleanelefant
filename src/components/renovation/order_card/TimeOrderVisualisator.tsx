import React from "react";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { IAddonReciver } from "../../../types";
import { addons } from "./../../../utils/addons";
import { generatePath } from "react-router-dom";

interface ITimeRateData {
  area_time_price: number;
  window_time_price: number;
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
  return Math.ceil(totalMinutes / shiftTime);
}

function convertMinutesToHoursAndMinutes(minutes: number) {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

function setTimeData(
  area: number,
  window: number,
  addons: IAddonReciver[],
  areaRate: number,
  windowRate: number,
  commonShiftTime: number,
  additionalShiftTime: number
): IStateData {
  //User time dada treatment
  const areaPerTen = Math.floor(area / 10);
  const areaDivisionRemainder = area % 10;
  const areaMinutes =
    areaPerTen * areaRate + areaDivisionRemainder * (areaRate / 10);
  const windowMinutes = window * windowRate;

  // Common and Additional Time Calculating
  const totalMinutes = areaMinutes + windowMinutes;
  const addonsMinutes = addons.reduce((sum, addon) => {
    return sum + addon.minutes;
  }, 0);

  //Personal Calculating
  const persons = setPersonal(totalMinutes, commonShiftTime);
  const washingPersonal = setPersonal(addonsMinutes, additionalShiftTime);

  //Total Time Calculating
  const totalTime =
    DevidedTime(totalMinutes, persons) +
    DevidedTime(addonsMinutes, washingPersonal);

  const convertedTime = convertMinutesToHoursAndMinutes(totalTime);

  return {
    hours: convertedTime.hours,
    minutes: roundToNext(convertedTime.minutes),
    persons: persons + washingPersonal,
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
  const { store } = useContext(Context);
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
        const imitationData = await new Promise<ITimeRateData>((resolve) => {
          setTimeout(() => {
            resolve({ area_time_price: 60, window_time_price: 60 });
          }, 2000); // Wait for 2 seconds
        });
        setIsTimeData(true);
        store.setAreaMinutesRate(imitationData.area_time_price);
        store.setWindowMinutesRate(imitationData.window_time_price);
      } catch (err) {
        // Catch any errors and set the error state
        setError(err.message);
      }
    };

    fetchData();
  }, []); // Only run once, on mount

  React.useEffect(() => {
    if (store.areaMinuteRate && store.windowMinuteRate) {
      const data: IStateData = setTimeData(
        store.area,
        store.windows,
        store.washingAddonReciver,
        store.areaMinuteRate,
        store.windowMinuteRate,
        store.commonShiftTime,
        store.additionalShiftTime
      );
      setState(data);
    }
  }, [store.area, store.windows, store.washingAddonReciver.length]);

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
        <div className='pt-1'>Kilkoro sprzątaczy {state.persons}</div>
      ) : null}
    </div>
  );
}

export default observer(TimeOrderVisualisator);
