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

interface ExtendedIDays extends IDays {
  dayStatus: string;
  monthStatus: string;
}

const today = new Date();
const actualYear = today.getFullYear()
let date = new Date(`January 1, ${actualYear}`);
let data: IDays[] = [];
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

  data.push(object);

  date.setDate(date.getDate() + 1);
}

function setItemClass(item: ExtendedIDays) {
  if (item.monthStatus === "current") {
    return "bg-green-200 ";
  }
  if (item.monthStatus === "next"&&item.dayStatus === "previousNext") {
    return "bg-gray-400";
  }
  if (item.monthStatus === "nextNext") {
    return "bg-gray-400";
  }
  if (item.monthStatus === "next") {
    return "bg-gray-200";
  }
}

export default function DatePickear() {
  const { store } = useContext(Context);
  const [month, setMonth] = React.useState(today.getMonth());

  const currentMonthDays = data.filter(
    (day) => day.month === monthsOfYear[month]
  );
  const firstDayOfCurrentMonth = currentMonthDays[0].dayOfWeek;
  const firstDayIndex = daysOfWeek.indexOf(firstDayOfCurrentMonth);  
  const previousMonthDays = data
    .filter((day) => day.month === monthsOfYear[month - 1])
    .slice(-firstDayIndex);

   
   
  const nextMonthDays = data
    .filter((day) => day.month === monthsOfYear[month + 1])
  

  const mapedPreviousMonthDays: ExtendedIDays[] = previousMonthDays.map((d) => {
    if (monthsOfYear.indexOf(d.month) + 1 > startMonth) {
      return { ...d, dayStatus: "previousNext", monthStatus: "next" };
    }   
    return { ...d, dayStatus: "previous", monthStatus: "previous" };
  });
  const mapedNextMonthDays: ExtendedIDays[] = nextMonthDays.map((d) => {
    return { ...d, dayStatus: "next", monthStatus: "nextNext" };
  });
  const mapedCurrentMonthDays: ExtendedIDays[] = currentMonthDays.map((d) => {
    if (d.date < day && d.month === monthsOfYear[startMonth]) {
      return { ...d, dayStatus: "previous", monthStatus: "current" };
    }
    if (d.date === day && d.month === monthsOfYear[startMonth]) {
      return { ...d, dayStatus: "today", monthStatus: "current" };
    }
    if (d.date > day && d.month === monthsOfYear[startMonth]) {
      return { ...d, dayStatus: "next", monthStatus: "current" };
    }
    return { ...d, dayStatus: "next", monthStatus: "next" };
  });


  let allDays:ExtendedIDays[] = []


  if(firstDayIndex!==0) {
     allDays = [
      ...mapedPreviousMonthDays,
      ...mapedCurrentMonthDays,    
    ];
  } else {
    allDays = [   
      ...mapedCurrentMonthDays,     
    ];
  }

  const numberNextMonthDays = 43-allDays.length

  const sliceFronMapedNextMonthDays = mapedNextMonthDays.slice(0,numberNextMonthDays)


  allDays= [...allDays,...sliceFronMapedNextMonthDays]

  allDays.shift();

  const dayClickHandler = (item:ExtendedIDays) =>{

    store.setServiceDay(item.month+" "+item.date)
  
  }

  // console.log("TOODEY",today,actualYear);

  return (
    <div>
      <div className="flex justify-between text-xl font-bold">
        {month > startMonth ? (
          <div className="text-center w-5">
            <div
              onClick={() => {
                setMonth((m) => m - 1);
              }}
            >{`<`}</div>
          </div>
        ) : (
          <div className="w-5 p-5"></div>
        )}
        <div className="">{monthsOfYear[month]}</div>
        {month<11?<div
          className=""
          onClick={() => {
            setMonth((m) => m + 1);
          }}
        >{`>`}</div> :<div className="w-5 p-5"></div>}
      </div>
      <div className="grid grid-cols-7">
        {daysOfWeek.map((d, index) => (
          <div className="py-2" key={index}>
            <p className="text-center font-medium">{d}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {allDays.map((d) => {
          if (d.dayStatus === "previous") {
            return (
              <div key={d.id} className="flex items-center justify-center">
                <div className="w-10 h-10 flex items-center justify-center text-slate-200 font-bold text-sm relative">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-0.5 bg-slate-200"></span>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
                    {d.date} 
                    {/* {d.month}                  */}
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div
              onClick={()=>{dayClickHandler(d)}}
              key={d.id}
              className={`${
                d.dayStatus === "today" ? "p-1" : "p-4"
              } ${setItemClass(
                d
              )} flex flex-col justify-center font-bold items-center cursor-pointer rounded-md`}
            >
              {d.dayStatus === "today" && (
                <p className="font-normal text-sm">today</p>
              )}
              <p>
                {d.date}
              {/* {d.month} */}
               </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
