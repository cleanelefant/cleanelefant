import { makeAutoObservable } from "mobx";
import {
  ExtendedIAddons,
  ExtendedIMinutes,
  ExtendedITime,
  IAddonReciver,
  IAdressForm,
  IContactForm,
  IErrorOrderPage,
  IErrors,
  IStep,
  rateType,
} from "../../../types";

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
  // addons: ExtendedIAddons[];
  // addonReciver: IAddonReciver[];
  // washingAddons: ExtendedIAddons[];
  // washingAddonReciver: IAddonReciver[];

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
  setRooms(rooms: number) {
    this.rooms = rooms;
  }
  setBedrooms(bedrooms: number) {
    this.bedrooms = bedrooms;
  }
  setBasePrice(basePrise: number) {
    this.basePrise = basePrise;
  }
  setRoomPrice(roomPrise: number) {
    this.roomPrise = roomPrise;
  }
  setBedroomPrice(bedroomPrise: number) {
    this.bedroomPrise = bedroomPrise;
  }
  setBaseMinutes(minutes: number) {
    this.baseMinutes = minutes;
  }
  setRoomMinutes(minutes: number) {
    this.roomMinutes = minutes;
  }
  setBedroomMinutes(minutes: number) {
    this.bedroomMinutes = minutes;
  }
  setActualRate(actualRate: rateType) {
    this.actualRate = actualRate;
  }
  setRates(rates: rateType[]) {
    this.rates = rates;
  }
  calculateTotalPrise() {
    const rate =
      this.actualRate.discount > this.ocassionalRate
        ? this.actualRate.discount
        : this.ocassionalRate;
    console.log("rate", rate);
    const number =
      (this.basePrise +
        this.roomPrise * this.rooms +
        this.bedroomPrise * this.bedrooms) *
      //  +
      // this.getWashingAddonTotalPrice()
      //  +
      // this.getAddonTotalPrice()) *
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
        this.bedroomPrise * this.bedrooms) *
      //  +
      // this.getWashingAddonTotalPrice() +
      // this.getAddonTotalPrice()) *
      this.homeRate *
      this.VATvalue;
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
  }

  setVat(value: number) {
    this.VATvalue = value;
  }
  setHomeRate(homeRate: number) {
    this.homeRate = homeRate;
  }

  changeRatesIsCurentValue(id: number) {
    this.rates.forEach((rate) => {
      rate.isCurent = false;
    });
    this.rates[id].isCurent = true;
  }
}
