import {
  rateType,
  IAddons,
  IAddonReciver,
  ExtendedIMinutes,
  ExtendedITime,
  IErrors,
  IFormInput,
  IAdressForm,
  IContactForm,
  ITime,
  IServiceTime,
  ExtendedIAddons,
} from "./../../../types";
import { makeAutoObservable } from "mobx";

export default class Store {
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
  adressFormData: IAdressForm;
  contactFormData: IContactForm;

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
    this.persons = 1;
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
      dateError: { isDateError: false, text: "Wybierz datę" },
      timeError: { isTimeError: false, text: "Wybierz czas" },
      streetError: { isStreetError: false, text: "Wprowadz ulicę" },
      zipError: { isZipError: false, text: "Wprowadz kod pocztowy" },
      houseError: { isHouseError: false, text: "Wprowadz numer domu" },
      localErrors: { isLocalError: false, text: "Wprowadz numer mieszkania" },
      levelErrors: { isLevelError: false, text: "Wprowadz piętro" },
      intercomErrors: { isIntercomError: false, text: "Wprowadz kod domofonu" },
      nameErrors: { isNameError: false, text: "Wprowadz imię" },
      emailErrors: {
        isEmailError: false,
        text: "Wprowadz email",
        isEmailValidDataError: false,
      },
      phoneErrors: { isPhoneError: false, text: "Wprowadz numer telefonu" },
    };
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
    this.totalMinutes =
      this.baseMinutes +
      this.roomMinutes * this.rooms +
      this.bedroomMinutes * this.bedrooms +
      this.getAddonTotalMinutes();
  }

  setTotalTime() {
    let totalTime: IServiceTime = { hours: 0, minutes: 0 };
    totalTime.hours = Math.floor(this.totalMinutes / 60);
    totalTime.minutes = this.totalMinutes % 60;
    return totalTime;
  }

  // Errors

  setDatePickerError(value: boolean) {
    this.pageErrors.dateError.isDateError = value;
  }

  setTimePickerError(value: boolean) {
    this.pageErrors.timeError.isTimeError = value;
  }

  setStreetError(value: boolean) {
    this.pageErrors.streetError.isStreetError = value;
  }

  setZipError(value: boolean) {
    this.pageErrors.zipError.isZipError = value;
  }

  setHouseError(value: boolean) {
    this.pageErrors.houseError.isHouseError = value;
  }

  setLevelError(value: boolean) {
    this.pageErrors.levelErrors.isLevelError = value;
  }

  setLocalError(value: boolean) {
    this.pageErrors.localErrors.isLocalError = value;
  }

  setIntercomeError(value: boolean) {
    this.pageErrors.intercomErrors.isIntercomError = value;
  }

  setNameError(value: boolean) {
    this.pageErrors.nameErrors.isNameError = value;
  }

  setPhoneError(value: boolean) {
    this.pageErrors.phoneErrors.isPhoneError = value;
  }

  setEmailError(value: boolean) {
    this.pageErrors.emailErrors.isEmailError = value;
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
