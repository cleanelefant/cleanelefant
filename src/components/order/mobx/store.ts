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
} from "./../../../types";
import { makeAutoObservable } from "mobx";
import { UseFormGetValues } from "react-hook-form/dist/types/form";

export default class Store {
  naming = { pokoj: "pokój", lazienka: "łazienka" };
  rooms: number;
  bedrooms: number;
  basePrise: number;
  roomPrise: number;
  bedroomPrise: number;
  VATvalue: number;
  rate: number;
  actualRate: rateType;
  rates: rateType[];
  homeRate: number;
  addons: IAddons[];
  addonReciver: IAddonReciver[];
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
    this.rooms = 1;
    this.bedrooms = 1;
    this.bedroomPrise = 30;
    this.roomPrise = 40;
    this.basePrise = 80;
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
    const number =
      (this.basePrise +
        this.roomPrise * this.rooms +
        this.bedroomPrise * this.bedrooms +
        this.getAddonTotalPrice()) *
      this.homeRate *
      this.VATvalue *
      (1 - this.actualRate.discount / 100);
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
  }

  calculateTotalPriseWithoutRate() {
    const number =
      (this.basePrise +
        this.roomPrise * this.rooms +
        this.bedroomPrise * this.bedrooms +
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

  addItemToAddonReciver(item: IAddonReciver) {
    this.addonReciver.push(item);
  }

  deleteItemFromAddonReciver(hash: string) {
    const index = this.addonReciver.findIndex((addon) => addon.hash === hash);
    if (index !== -1) {
      this.addonReciver.splice(index, 1);
    }
  }

  deleteMultyItemFromAddonReciver(hash: string, multyId: number) {
    const index = this.addonReciver.findIndex(
      (addon) => addon.hash === hash && addon.multyId === multyId
    );
    if (index !== -1) {
      this.addonReciver.splice(index, 1);
    }
  }

  getAddonTotalPrice() {
    return this.addonReciver.reduce((sum, obj) => sum + obj.price, 0);
  }

  setAddons(addons: IAddons[]) {
    this.addons = addons;
  }

  setHomeRate(homeRate: number) {
    this.homeRate = homeRate;
  }

  setActualRate(actualRate: rateType) {
    this.actualRate = actualRate;
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
