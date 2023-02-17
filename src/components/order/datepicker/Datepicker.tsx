import React, { useContext } from "react";
const daysOfWeek = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface IDays {
    id:number;
    date:number;
    month:string;
    dayOfWeek:string;
}

interface ExtendedIDays extends IDays  {
    dayStatus:string;
    monthStatus:string
}

const today = new Date();
let date = new Date("January 1, 2023");
// let year = date.getFullYear();
let data:IDays[] = [];
const month = today.getMonth()
const day = today.getDate()

for (let i = 0; i < 365; i++) {
  let id = i + 1;
  let day = date.getDate();
  let month = monthsOfYear[date.getMonth()];
  let dayOfWeek = daysOfWeek[date.getDay()];

  let object = {
    id: id,
    date: day,
    month: month,
    dayOfWeek: dayOfWeek
  };

  data.push(object);

  date.setDate(date.getDate() + 1);
}

 const currentMonthDays = data.filter(day=>day.month === monthsOfYear[month]);
 const firstDayOfCurrentMonth = currentMonthDays[0].dayOfWeek;
 const firstDayIndex = daysOfWeek.indexOf(firstDayOfCurrentMonth);
 const lastDayIndex = daysOfWeek.indexOf(firstDayOfCurrentMonth);
 const previousMonthDays = data.filter(day=>day.month === monthsOfYear[month-1]).slice(-firstDayIndex);
 const nextMonthDays = data.filter(day=>day.month === monthsOfYear[month+1]).slice(0, 7-lastDayIndex+7);
 
 const mapedPreviousMonthDays:ExtendedIDays[] = previousMonthDays.map(d=>{return {...d,dayStatus:"previous",monthStatus:"previous"}});
 const mapedNextMonthDays:ExtendedIDays[] = nextMonthDays.map(d=>{return {...d,dayStatus:"next",monthStatus:"next"}});
 const mapedCurrentMonthDays:ExtendedIDays[] = currentMonthDays.map(d=>{
    if(d.date < day) { return {...d,dayStatus:"previous",monthStatus:"current"}}
    if(d.date===day) { return {...d,dayStatus:"today",monthStatus:"current"}}
    if(d.date > day) { return {...d,dayStatus:"next",monthStatus:"current"}}
    }
    );

 const allDays = [...mapedPreviousMonthDays,...mapedNextMonthDays,...mapedCurrentMonthDays];



export default function DatePickear(){
    console.log("TOODEY", allDays, day, month  )
    
    return (
        <div>
        <div className="basis-1">DatePickear</div>
        <div className="text-center">{monthsOfYear[month]}</div>
        <div className="grid grid-cols-7 gap-4">
            {daysOfWeek .map(d=><div><p>{d}</p></div>)}
        </div>
        <div className="grid grid-cols-7 gap-4">
            {allDays.map(d=><div><p>{d.date}</p></div>)}
        </div>
        </div>
    )
}

