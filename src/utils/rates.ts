import { rateType } from "../types";

export const fetchedRates: rateType[] = [
    {
      id: 1,
      title: "Raz w tygodniu",
      discount: 20,
      link: "week",
      isCurent: true,
    },
    {
      id: 2,
      title: "Raz na dwa tygodnie",
      discount: 15,
      link: "twicepermonth",
      isCurent: false,
    },
    {
      id: 3,
      title: "Raz w miesiącu",
      discount: 10,
      link: "month",
      isCurent: false,
    },
    {
      id: 4,
      title: "Jednorazowe sprzątanie",
      discount: 0,
      link: "once",
      isCurent: false,
    },
  ];