import { makeAutoObservable } from "mobx";
import {
  ExtendedIMinutes,
  ExtendedITime,
  IAdressForm,
  IContactForm,
  IErrorOrderPage,
  IErrors,
  IStep,
} from "../../../types";

export default class This {
  area: number;
  windows: number;
  area_price: number;
  window_price: number;
  vat: number;
  ocassionalRate: number;
  serviceDay: string;
  time: string;
  times: ExtendedITime[];
  minutes: ExtendedIMinutes[];
  adressFormData: IAdressForm;
  contactFormData: IContactForm;
  isCash: boolean;
  pageErrors: IErrors;
  errorArray: IErrorOrderPage[];
  steps: IStep[];
  isRulesChecked: boolean;
  isRodoChecked: boolean;

  constructor() {
    makeAutoObservable(this);
    this.area = 0;
    this.windows = 0;
    this.vat = 1;
    this.ocassionalRate = 0;
    this.serviceDay = "";
    this.time = "";
    this.times = [];
    this.isCash = true;
    this.minutes = [];
    this.area_price = 0;
    this.window_price = 0;
    this.isRulesChecked = false;
    this.isRodoChecked = false;
    this.adressFormData = {
      street: "",
      house: "",
      level: "",
      local: "",
      intercom: "",
      zip: "",
    };
    this.contactFormData = {
      name: "",
      email: "",
      phone: "",
      notes: "",
    };
    this.pageErrors = {
      rulesError: {
        isError: false,
        level: 13,
        target: "rules_order_page",
      },
      comercialDataError: {
        isError: false,
        text: "Minimalna suma zamówienia przy remoncie 200.00 zł",
        level: 13,
        target: "commercial_data_order_page",
      },
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
    this.errorArray = [] as IErrorOrderPage[];

    this.steps = [] as IStep[];
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
    this.times = times;
  }

  setDatePickerError(value: boolean) {
    this.pageErrors.dateError.isError = value;
  }

  setRulesError(value: boolean) {
    this.pageErrors.rulesError.isError = value;
  }

  setCommercialDataError(value: boolean) {
    console.log("setCommercialDataError", value);
    this.pageErrors.comercialDataError.isError = value;
  }

  setMinutes(minutes: ExtendedIMinutes[]) {
    this.minutes = minutes;
  }

  setTimePickerError(value: boolean) {
    this.pageErrors.timeError.isError = value;
  }
  setAreaPrice(area_price: number) {
    this.area_price = area_price;
  }
  setWindowPrice(window_price: number) {
    this.window_price = window_price;
  }
  setVat(value: number) {
    this.vat = value;
  }

  setIsCash(value: boolean) {
    this.isCash = value;
  }

  setIsRulesChecked(value: boolean) {
    this.isRulesChecked = value;
  }

  setIsRodoChecked(value: boolean) {
    this.isRodoChecked = value;
  }

  getTotalPrice() {
    let result =
      (this.area * this.area_price + this.windows * this.window_price) *
      this.vat *
      ((100 - this.ocassionalRate) / 100);
    result = parseFloat(result.toFixed(2));
    return result;
  }
  getTotalPriceWithoutRate() {
    let result =
      (this.area * this.area_price + this.windows * this.window_price) *
      this.vat;
    result = parseFloat(result.toFixed(2));
    return result;
  }
  // Errors

  errrorHandler() {
    this.setDatePickerError(!!!this.serviceDay);
    this.setTimePickerError(!!!this.time);
    this.setStreetError(!!!this.adressFormData.street);
    this.setHouseError(!!!this.adressFormData.house);
    // this.setLocalError(!!!this.adressFormData.local);
    // this.setLevelError(!!!this.adressFormData.level);
    // this.setZipError(!!!this.adressFormData.zip);
    // this.setIntercomeError(!!!this.adressFormData.zip);
    // this.setNameError(!!!this.contactFormData.name);
    this.setEmailError(!!!this.contactFormData.email);
    this.setPhoneError(!!!this.contactFormData.phone);
    this.setCommercialDataError(!(this.getTotalPrice() > 200));
    this.setRulesError(!this.isRulesChecked);
    for (const item in this.pageErrors) {
      this.errorArray.push(this.pageErrors[item]);
    }
    const activeErrorFilterArr = this.errorArray.filter((item) => item.isError);
    if (activeErrorFilterArr.length > 0) {
      const higestLevel = activeErrorFilterArr.reduce(function (prev, current) {
        return prev.level < current.level ? prev : current;
      });
      const target = document.getElementById(higestLevel.target);
      target?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    if (this.pageErrors.emailErrors.isEmailValidDataError) {
      const target = document.getElementById("contact_form_order_page");
      target?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }
  setStreetError(value: boolean) {
    this.pageErrors.streetError.isError = value;
  }
  setHouseError(value: boolean) {
    this.pageErrors.houseError.isError = value;
  }
  setPhoneError(value: boolean) {
    this.pageErrors.phoneErrors.isError = value;
  }
  setEmailError(value: boolean) {
    this.pageErrors.emailErrors.isError = value;
  }

  // Forms handler
  adressFormHandler(key: string, value: string) {
    this.adressFormData[key] = value;
  }

  contactFormHandler(key: string, value: string) {
    this.contactFormData[key] = value;
  }

  // Steps

  setSteps(steps: IStep[]) {
    this.steps = steps;
  }
}
