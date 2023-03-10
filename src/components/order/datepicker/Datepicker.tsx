import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const shortDaysOfWeek = ["PON", "WT", "ŚR", "CZW", "PT", "SOB", "NIEDZ"];

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface IDays {
  id: number;
  date: number;
  month: string;
  dayOfWeek: string;
}

interface IDaysRate {
  id: number;
  date: number;
  month: string;
  rate: number;
}
const rates: IDaysRate[] = [
  { id: 1, date: 10, month: "March", rate: 20 },
  { id: 1, date: 15, month: "March", rate: 10 },
  { id: 2, date: 19, month: "March", rate: 20 },
  { id: 3, date: 22, month: "March", rate: 15 },
  { id: 4, date: 2, month: "April", rate: 15 },
  { id: 5, date: 8, month: "April", rate: 20 },
];

interface ExtendedIDays extends IDays {
  dayStatus: string;
  monthStatus: string;
  isActive: boolean;
  rate?: number;
}

const today = new Date();
const actualYear = today.getFullYear();
let date = new Date(`January 1, ${actualYear}`);
let dayData: IDays[] = [];
const startMonth = today.getMonth();
const day = today.getDate();

for (let i = 0; i < 365; i++) {
  let id = i + 1;
  let day = date.getDate();
  let month = monthsOfYear[date.getMonth()];
  let dayOfWeek = daysOfWeek[date.getDay()];

  let object = {
    id: id,
    date: day,
    month: month,
    dayOfWeek: dayOfWeek,
  };

  dayData.push(object);

  date.setDate(date.getDate() + 1);
}

function setItemClass(item: ExtendedIDays) {
  if (item.monthStatus === "current") {
    if (item.isActive) {
      return "bg-blue-500";
    } else {
      return "bg-stone-400";
    }
  }
  if (item.monthStatus === "next" && item.dayStatus === "previousNext") {
    if (item.isActive) {
      return "bg-blue-500 ";
    } else {
      return "bg-gray-400 ";
    }
  }
  if (item.monthStatus === "nextNext") {
    if (item.isActive) {
      return "bg-blue-500 lg:px-12";
    } else {
      return "bg-gray-400 lg:px-12";
    }
  }
  if (item.monthStatus === "next") {
    if (item.isActive) {
      return "bg-blue-500";
    } else {
      return "bg-gray-200";
    }
  }
}

function DatePickear() {
  const { store } = useContext(Context);
  const [month, setMonth] = React.useState(today.getMonth());
  const [days, setDays] = React.useState<ExtendedIDays[]>([]);
  // const myRef = React.useRef(null);

  const dayClickHandler = (item: ExtendedIDays) => {
    if (item.isActive === false) {
      if (item.rate) {
        store.setOcassionalRate(item.rate);
      } else {
        store.setOcassionalRate(0);
      }
      store.setServiceDay(item.month + " " + item.date);
      store.setDatePickerError(false);
      store.setTime("");
      store.setTimes(
        [...store.times].map((t) => {
          return { ...t, isModal: false };
        })
      );
    }

    if (item.isActive === true) {
      store.setOcassionalRate(0);
      store.setServiceDay("");
      store.setTime("");
      store.setTimes(
        [...store.times].map((t) => {
          return { ...t, isModal: false };
        })
      );
    }

    setDays((d) => {
      if (item.isActive === false) {
        return [...d].map((obj) => {
          if (obj.id === item.id) {
            return { ...obj, isActive: true };
          }
          return { ...obj, isActive: false };
        });
      } else {
        return [...d].map((obj) => {
          return { ...obj, isActive: false };
        });
      }
    });
  };

  React.useEffect(() => {
    const fetchedRates = [...rates];
    const currentMonthDays = dayData.filter(
      (day) => day.month === monthsOfYear[month]
    );
    const firstDayOfCurrentMonth = currentMonthDays[0].dayOfWeek;
    const firstDayIndex = daysOfWeek.indexOf(firstDayOfCurrentMonth);
    const previousMonthDays = dayData
      .filter((day) => day.month === monthsOfYear[month - 1])
      .slice(-firstDayIndex);
    const nextMonthDays = dayData.filter(
      (day) => day.month === monthsOfYear[month + 1]
    );
    const mapedPreviousMonthDays: ExtendedIDays[] = previousMonthDays.map(
      (d) => {
        if (monthsOfYear.indexOf(d.month) + 1 > startMonth) {
          return {
            ...d,
            dayStatus: "previousNext",
            monthStatus: "next",
            isActive: false,
          };
        }
        return {
          ...d,
          dayStatus: "previous",
          monthStatus: "previous",
          isActive: false,
        };
      }
    );
    const mapedNextMonthDays: ExtendedIDays[] = nextMonthDays.map((d) => {
      return {
        ...d,
        dayStatus: "next",
        monthStatus: "nextNext",
        isActive: false,
      };
    });
    const mapedCurrentMonthDays: ExtendedIDays[] = currentMonthDays.map((d) => {
      if (d.date < day && d.month === monthsOfYear[startMonth]) {
        return {
          ...d,
          dayStatus: "previous",
          monthStatus: "current",
          isActive: false,
        };
      }
      if (d.date === day && d.month === monthsOfYear[startMonth]) {
        return {
          ...d,
          dayStatus: "today",
          monthStatus: "current",
          isActive: false,
        };
      }
      if (d.date > day && d.month === monthsOfYear[startMonth]) {
        return {
          ...d,
          dayStatus: "next",
          monthStatus: "current",
          isActive: false,
        };
      }
      return { ...d, dayStatus: "next", monthStatus: "next", isActive: false };
    });
    let allDays: ExtendedIDays[] = [];
    if (firstDayIndex !== 0) {
      allDays = [...mapedPreviousMonthDays, ...mapedCurrentMonthDays];
    } else {
      allDays = [...mapedCurrentMonthDays];
    }
    const numberNextMonthDays = 43 - allDays.length;
    const sliceFronMapedNextMonthDays = mapedNextMonthDays.slice(
      0,
      numberNextMonthDays
    );
    allDays = [...allDays, ...sliceFronMapedNextMonthDays];
    allDays.shift();
    const addRatesToAllDays = [...allDays].map((day) => {
      const find = fetchedRates.find(
        (item) => item.date === day.date && item.month === day.month
      );
      if (find) {
        return { ...day, rate: find.rate };
      } else {
        return day;
      }
    });

    setDays(addRatesToAllDays);
  }, [month]);

  return (
    <div
      className={`${
        store.pageErrors.dateError.isError
          ? "border-red-500 border-4"
          : "text-gray-700 border-2"
      }  p-2`}
      id='datepicker_order_page'
    >
      <div className='flex justify-between items-center text-xl font-bold'>
        {month > startMonth ? (
          <div className=' lg:text-5xl cursor-pointer'>
            <div
              onClick={() => {
                setMonth((m) => m - 1);
              }}
            >{`<`}</div>
          </div>
        ) : (
          <div className='w-5 p-5'></div>
        )}
        <div className='lg:text-3xl'>{monthsOfYear[month]}</div>
        {month < 11 ? (
          <div
            className='lg:text-5xl cursor-pointer'
            onClick={() => {
              setMonth((m) => m + 1);
            }}
          >{`>`}</div>
        ) : (
          <div className='w-5 p-5'></div>
        )}
      </div>
      <div className='grid grid-cols-7'>
        {shortDaysOfWeek.map((d, index) => (
          <div className='py-2' key={index}>
            <p className='text-center font-medium'>{d}</p>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-2'>
        {days.map((d) => {
          if (d.dayStatus === "previous") {
            return (
              <div key={d.id} className='flex items-center justify-center'>
                <div className='w-9 lg:w-16 h-9 lg:h-16 flex items-center border justify-center text-slate-200 font-bold text-sm relative rounded-md'>
                  <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-0.5 bg-slate-200'></span>
                  <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full'>
                    {d.date}
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div
              onClick={() => {
                dayClickHandler(d);
              }}
              key={d.id}
              className={` ${
                d.rate > 0 || d.dayStatus === "today" ? "py-0" : "py-3 lg:py-6"
              } ${setItemClass(d)} flex flex-col justify-center ${
                d.isActive ? "font-bold  text-white" : "font-thin"
              } items-center cursor-pointer rounded-md leading-none`}
            >
              {d.dayStatus === "today" && (
                <p className='font-extrabold text-[10px] lg:text-[16px] leading-none'>
                  dzisiaj
                </p>
              )}
              <p className=' text-[10px] lg:text-[16px] font-extrabold leading-none'>
                {d.rate && `${d.rate}%`}
              </p>
              <p className='lg:text-xl font-medium'>{d.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default observer(DatePickear);
