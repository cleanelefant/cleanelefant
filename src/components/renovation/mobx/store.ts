import { makeAutoObservable } from "mobx";
import { ExtendedITime, IErrors } from "../../../types";

export default class This {
  area: number;
  windows: number;
  ocassionalRate: number;
  serviceDay: string;
  time: string;
  times: ExtendedITime[];
  pageErrors: IErrors;
  constructor() {
    makeAutoObservable(this);
    this.area = 0;
    this.windows = 0;
    this.ocassionalRate = 0;
    this.serviceDay = "";
    this.time = "";
    this.times = [];
    this.pageErrors = {
      dateError: {
        isError: false,
        text: "Wybierz datę",
        level: 1,
        target: "datepicker_order_page",
      },
      timeError: {
        isError: false,
        text: "Wybierz czas",
        level: 2,
        target: "timepicker_order_page",
      },
      streetError: {
        isError: false,
        text: "Wprowadz ulicę",
        level: 3,
        target: "adress_form_order_page",
      },
      zipError: {
        isError: false,
        text: "Wprowadz kod pocztowy",
        level: 4,
        target: "adress_form_order_page",
      },
      houseError: {
        isError: false,
        text: "Wprowadz numer domu",
        level: 5,
        target: "adress_form_order_page",
      },
      localErrors: {
        isError: false,
        text: "Wprowadz numer mieszkania",
        level: 6,
        target: "adress_form_order_page",
      },
      levelErrors: {
        isError: false,
        text: "Wprowadz piętro",
        level: 7,
        target: "adress_form_order_page",
      },
      intercomErrors: {
        isError: false,
        text: "Wprowadz kod domofonu",
        level: 8,
        target: "adress_form_order_page",
      },
      nameErrors: {
        isError: false,
        text: "Wprowadz imię",
        level: 9,
        target: "contact_form_order_page",
      },
      emailErrors: {
        isError: false,
        text: "Wprowadz email",
        isEmailValidDataError: false,
        level: 10,
        target: "contact_form_order_page",
      },
      phoneErrors: {
        isError: false,
        text: "Wprowadz numer telefonu",
        level: 11,
        target: "contact_form_order_page",
      },
    };
  }
  setArea(event: any) {
    const enteredValue = event.target.value.replace(/[^0-9]/g, "");
    this.area = Number(enteredValue);
  }
  increaseArea() {
    this.area = this.area + 1;
  }
  decreaseArea() {
    if (this.area > 0) {
      this.area = this.area - 1;
    }
  }
  increaseWindows() {
    this.windows = this.windows + 1;
  }
  decreaseWindows() {
    if (this.windows > 0) {
      this.windows = this.windows - 1;
    }
  }
  setOcassionalRate(ocassionalRate: number) {
    this.ocassionalRate = ocassionalRate;
  }
  setServiceDay(day: string) {
    this.serviceDay = day;
  }
  setTime(time: string) {
    this.time = time;
  }

  setTimes(times: ExtendedITime[]) {
    console.log("setTimes", times);
    this.times = times;
  }

  setDatePickerError(value: boolean) {
    this.pageErrors.dateError.isError = value;
  }
}
