import React from "react";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { IAddonReciver } from "../../../types";

interface ITimeRateData {
  area_time_price: number;
  window_time_price: number;
}

interface IStateData {
  hours: number;
  minutes: number;
  persons: number;
}

function setTimeData(
  area: number,
  window: number,
  addons: IAddonReciver[],
  areaRate: number,
  windowRate: number
): IStateData {
  return { hours: 8, minutes: 20, persons: 1 };
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
            resolve({ area_time_price: 60, window_time_price: 50 });
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
        store.windowMinuteRate
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
      {state.persons ? (
        <div className='pt-1'>Kilkoro sprzątaczy {state.persons}</div>
      ) : null}
    </div>
  );
}

export default observer(TimeOrderVisualisator);
