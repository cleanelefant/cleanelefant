import {
  rateType,
  IAddonReciver,
  ExtendedIMinutes,
  ExtendedITime,
  IErrors,
  IAdressForm,
  IContactForm,
  IServiceTime,
  ExtendedIAddons,
  IStep,
  IErrorOrderPage,
} from "./../../../types";
import { makeAutoObservable } from "mobx";

export default class This {
  naming = { pokoj: "pokój", lazienka: "łazienka" };
  rooms: number;
  bedrooms: number;
  basePrise: number;
  baseMinutes: number;
  roomPrise: number;
  bedroomPrise: number;
  roomMinutes: number;
  bedroomMinutes: number;
  totalMinutes: number;
  cleaningPersons: number;
  washingPersons: number;
  persons: number;
  VATvalue: number;
  rate: number;
  actualRate: rateType;
  ocassionalRate: number;
  rates: rateType[];
  homeRate: number;
  addons: ExtendedIAddons[];
  addonReciver: IAddonReciver[];
  washingAddons: ExtendedIAddons[];
  washingAddonReciver: IAddonReciver[];
  time: string;
  times: ExtendedITime[];
  minutes: ExtendedIMinutes[];
  serviceDay: string;
  isCash: boolean;
  pageErrors: IErrors;
  errorArray: IErrorOrderPage[];
  adressFormData: IAdressForm;
  contactFormData: IContactForm;
  steps: IStep[];

  constructor() {
    makeAutoObservable(this);
    this.ocassionalRate = 0;
    this.rooms = 1;
    this.bedrooms = 1;
    this.bedroomPrise = 30;
    this.roomPrise = 40;
    this.basePrise = 80;
    this.baseMinutes = 90;
    this.roomMinutes = 30;
    this.bedroomMinutes = 60;
    this.totalMinutes = 180;
    this.cleaningPersons = 1;
    this.washingPersons = 0;
    this.VATvalue = 1;
    this.actualRate = {
      id: 4,
      title: "Jednorazowe sprzątanie",
      discount: 0,
      link: "once",
      isCurent: false,
    };
    this.homeRate = 1;
    this.addonReciver = [];
    this.washingAddonReciver = [];
    this.time = "";
    this.minutes = [];
    this.serviceDay = "";
    this.isCash = true;
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
  // Steps

  setSteps(steps: IStep[]) {
    this.steps = steps;
  }

  clickStepHandler(target: string) {
    this.steps = [...this.steps].map((item) => {
      if (item.target === target) {
        return { ...item, isActive: true };
      }
      return { ...item, isActive: false };
    });
  }

  // Minutes

  setBaseMinutes(minutes: number) {
    this.baseMinutes = minutes;
  }
  setRoomMinutes(minutes: number) {
    this.roomMinutes = minutes;
  }
  setBedroomMinutes(minutes: number) {
    this.bedroomMinutes = minutes;
  }

  setTotalMinutes() {
    const limit = 5;
    const baseTime =
      this.baseMinutes +
      this.roomMinutes * this.rooms +
      this.bedroomMinutes * this.bedrooms +
      this.getAddonTotalMinutes();

    const cleaningPersons = Math.trunc(baseTime / 60 / limit);

    if (cleaningPersons > 1) {
      this.setCleaningPersons(cleaningPersons);
    }

    const washingTime = this.getWashingAddonTotalMinutes();

    if (washingTime) {
      const washingPersons = Math.trunc(washingTime / 60 / limit);
      if (washingPersons < 2) {
        this.setWashingPersons(1);
      }
      if (washingPersons > 1) {
        this.setWashingPersons(washingPersons);
      }
    }
    const delta = washingTime - baseTime;
    this.totalMinutes = baseTime > washingTime ? baseTime : baseTime + delta;
  }

  getPersons() {
    return this.cleaningPersons + this.washingPersons;
  }

  setCleaningPersons(persons: number) {
    this.cleaningPersons = persons;
  }
  setWashingPersons(persons: number) {
    this.washingPersons = persons;
  }

  setTotalTime() {
    let totalTime: IServiceTime = { hours: 0, minutes: 0 };
    totalTime.hours = Math.floor(this.totalMinutes / 60);
    totalTime.minutes = this.totalMinutes % 60;
    return totalTime;
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

  setDatePickerError(value: boolean) {
    this.pageErrors.dateError.isError = value;
  }

  setTimePickerError(value: boolean) {
    this.pageErrors.timeError.isError = value;
  }

  setStreetError(value: boolean) {
    this.pageErrors.streetError.isError = value;
  }

  setZipError(value: boolean) {
    this.pageErrors.zipError.isError = value;
  }

  setHouseError(value: boolean) {
    this.pageErrors.houseError.isError = value;
  }

  setLevelError(value: boolean) {
    this.pageErrors.levelErrors.isError = value;
  }

  setLocalError(value: boolean) {
    this.pageErrors.localErrors.isError = value;
  }

  setIntercomeError(value: boolean) {
    this.pageErrors.intercomErrors.isError = value;
  }

  setNameError(value: boolean) {
    this.pageErrors.nameErrors.isError = value;
  }

  setPhoneError(value: boolean) {
    this.pageErrors.phoneErrors.isError = value;
  }

  setEmailError(value: boolean) {
    this.pageErrors.emailErrors.isError = value;
  }

  setIsEmailValidDataError(value: boolean) {
    this.pageErrors.emailErrors.isEmailValidDataError = value;
  }

  // forms handler
  adressFormHandler(key: string, value: string) {
    this.adressFormData[key] = value;
  }

  contactFormHandler(key: string, value: string) {
    this.contactFormData[key] = value;
  }

  calculateTotalPrise() {
    const rate =
      this.actualRate.discount > this.ocassionalRate
        ? this.actualRate.discount
        : this.ocassionalRate;
    const number =
      (this.basePrise +
        this.roomPrise * this.rooms +
        this.bedroomPrise * this.bedrooms +
        this.getWashingAddonTotalPrice() +
        this.getAddonTotalPrice()) *
      this.homeRate *
      this.VATvalue *
      (1 - rate / 100);
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
  }

  calculateTotalPriseWithoutRate() {
    const number =
      (this.basePrise +
        this.roomPrise * this.rooms +
        this.bedroomPrise * this.bedrooms +
        this.getWashingAddonTotalPrice() +
        this.getAddonTotalPrice()) *
      this.homeRate *
      this.VATvalue;
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
  }

  setIsCash(value: boolean) {
    this.isCash = value;
  }

  setServiceDay(day: string) {
    this.serviceDay = day;
  }

  setMinutes(minutes: ExtendedIMinutes[]) {
    this.minutes = minutes;
  }

  setTime(time: string) {
    this.time = time;
  }

  setTimes(times: ExtendedITime[]) {
    this.times = times;
  }

  setActivityInAddons(hash: string) {
    const index = this.addons.findIndex((addon) => addon.hash === hash);
    this.addons[index].isActive = !this.addons[index].isActive;
  }

  setActivityInWashingAddons(hash: string) {
    const index = this.washingAddons.findIndex((addon) => addon.hash === hash);
    this.washingAddons[index].isActive = !this.washingAddons[index].isActive;
  }

  addItemToAddonReciver(item: IAddonReciver) {
    this.addonReciver.push(item);
  }

  deleteItemFromAddonReciver(hash: string) {
    const index = this.addonReciver.findIndex((addon) => addon.hash === hash);
    if (index !== -1) {
      this.addonReciver.splice(index, 1);
    }
  }

  deleteItemFromWashingAddonReciver(hash: string) {
    const index = this.washingAddonReciver.findIndex(
      (addon) => addon.hash === hash
    );
    if (index !== -1) {
      this.washingAddonReciver.splice(index, 1);
    }
  }

  addItemToWashingAddonReciver(item: IAddonReciver) {
    this.washingAddonReciver.push(item);
  }

  deleteItemFromWashingReciver(hash: string) {
    const index = this.washingAddonReciver.findIndex(
      (addon) => addon.hash === hash
    );
    if (index !== -1) {
      this.washingAddonReciver.splice(index, 1);
    }
  }

  deleteItemsWithSameHashFromAddonReciver(hash: string) {
    this.addonReciver = [...this.addonReciver].filter(
      (addon) => addon.hash !== hash
    );
  }

  deleteItemsWithSameHashFromWashingAddonReciver(hash: string) {
    this.washingAddonReciver = [...this.washingAddonReciver].filter(
      (addon) => addon.hash !== hash
    );
  }

  deleteMultyItemFromAddonReciver(hash: string, multyId: number) {
    const index = this.addonReciver.findIndex(
      (addon) => addon.hash === hash && addon.multyId === multyId
    );
    if (index !== -1) {
      this.addonReciver.splice(index, 1);
    }
  }

  deleteMultyItemFromWashingAddonReciver(hash: string, multyId: number) {
    const index = this.washingAddonReciver.findIndex(
      (addon) => addon.hash === hash && addon.multyId === multyId
    );
    if (index !== -1) {
      this.washingAddonReciver.splice(index, 1);
    }
  }

  getAddonTotalPrice() {
    return this.addonReciver.reduce((sum, obj) => sum + obj.price, 0);
  }

  getWashingAddonTotalPrice() {
    return this.washingAddonReciver.reduce((sum, obj) => sum + obj.price, 0);
  }

  getAddonTotalMinutes() {
    return this.addonReciver.reduce((sum, obj) => sum + obj.minutes, 0);
  }

  getWashingAddonTotalMinutes() {
    return this.washingAddonReciver.reduce((sum, obj) => sum + obj.minutes, 0);
  }

  setAddons(addons: ExtendedIAddons[]) {
    this.addons = addons;
  }

  setWashingAddons(washingAddons: ExtendedIAddons[]) {
    this.washingAddons = washingAddons;
  }

  setHomeRate(homeRate: number) {
    this.homeRate = homeRate;
  }

  setActualRate(actualRate: rateType) {
    this.actualRate = actualRate;
  }

  setOcassionalRate(ocassionalRate: number) {
    this.ocassionalRate = ocassionalRate;
  }

  changeRatesIsCurentValue(id: number) {
    this.rates.forEach((rate) => {
      rate.isCurent = false;
    });
    this.rates[id].isCurent = true;
  }

  setRates(rates: rateType[]) {
    this.rates = rates;
  }

  setBasePrice(basePrise: number) {
    this.basePrise = basePrise;
  }

  setRoomPrice(roomPrise: number) {
    this.roomPrise = roomPrise;
  }

  setBedPrice(bedroomPrise: number) {
    this.bedroomPrise = bedroomPrise;
  }

  setVATvalue(VATvalue: number) {
    this.VATvalue = VATvalue;
  }

  setRooms(rooms: number) {
    this.rooms = rooms;
  }
  setBedrooms(bedrooms: number) {
    this.bedrooms = bedrooms;
  }
  increaseRoom() {
    this.rooms = this.rooms + 1;
  }
  decreaseRoom() {
    if (this.rooms > 1) {
      this.rooms = this.rooms - 1;
    }
  }
  increaseBedroom() {
    this.bedrooms = this.bedrooms + 1;
  }
  decreaseBedroom() {
    if (this.bedrooms > 1) {
      this.bedrooms = this.bedrooms - 1;
    }
  }
}
