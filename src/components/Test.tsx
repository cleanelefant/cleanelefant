export default function Test () {
    const divClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{console.log(e.target)}
    const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{console.log(e.target)}
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = new Date("January 1, 2023");
let year = date.getFullYear();
let data = [];

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

// console.log(data);
    return (<div className="flex justify-center items-center p-10 bg-slate-500" onClick={(e)=>{divClickHandler(e)}}>
        <button className="bg-blue-500 text-white p-4" onClick={(e)=>{buttonClickHandler(e)}} >Button</button>
    </div>)
}