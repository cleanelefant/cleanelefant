import cleaning from "../images/services/household.png";
import renovation from "../images/services/paint-roller.png";
import window from "../images/services/windows.png";
import sofa from "../images/services/sofa.png";
import handyman from "../images/services/wrench-tool.png";
import kitchen from "../images/services/kitchen.png";
import car from "../images/services/car.png";
import office from "../images/services/office-building.png";
import home from "../images/services/home.png";

export const services = [
  { id: 1, src: cleaning, title: "Sprzątanie mieszkania", shortTitle:"Mieszkania", link: "./test" },
  { id: 2, src: renovation, title: "Sprzątanie po remoncie",shortTitle:"Po remoncie", link: "./test" },
  { id: 3, src: window, title: "Mycie okien",shortTitle:"Okna", link: "./test" },
  {
    id: 4,
    src: sofa,
    title: "Czyszczenie chemiczne mebli i kanap",
    shortTitle: "Meble",
    link: "./test",
  },
  // {
  //   id: 5,
  //   src: handyman,
  //   title: "Złota rączka",
  //   link: "./test",
  // },
  {
    id: 6,
    src: kitchen,
    title: "Sprzątanie kuchni",
    shortTitle: "Kuchnia",
    link: "./test",
  },
  {
    id: 7,
    src: car,
    title: "Mycie i sprzątanie samochodu",
    shortTitle: "Samochody",
    link: "./test",
  },

  {
    id: 8,
    src: office,
    title: "Sprzątanie biur",
    shortTitle: "Biura",
    link: "./test",
  },
  {
    id: 9,
    src: home,
    title: "Sprzątanie domu prywatnego i działki",
    shortTitle: "Domy",
    link: "./test",
  },
];
