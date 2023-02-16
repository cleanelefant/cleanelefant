import { rateType, IAddons, IAddonReciver } from "./../../../types";
import { makeAutoObservable } from "mobx";

export default class Store {
  naming = { pokoj: "pokój", lazienka: "łazienka" };
  rooms: number;
  bedrooms: number;
  basePrise: number;
  roomPrise: number;
  bedroomPrise: number;
  VATvalue: number;
  rate: number;
  actualRate: number;
  rates: rateType[];
  homeRate: number;
  addons: IAddons[];
  addonReciver: IAddonReciver[];


  constructor() {
    makeAutoObservable(this);
    this.rooms = 1;
    this.bedrooms = 1;
    this.bedroomPrise = 30;
    this.roomPrise = 40;
    this.basePrise = 80;
    this.VATvalue = 1;
    this.actualRate = 1;
    this.homeRate = 1;
    this.addonReciver = [];
  
  }

  calculateTotalPrise() {
    const number =
      (this.basePrise +
        this.roomPrise * this.rooms +
        this.bedroomPrise * this.bedrooms+this.getAddonTotalPrice()) *
      this.homeRate *
      this.VATvalue *
      this.actualRate;
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
  }

  calculateTotalPriseWithoutRate() {
    const number =
      (this.basePrise +
        this.roomPrise * this.rooms +
        this.bedroomPrise * this.bedrooms+this.getAddonTotalPrice()) *
      this.homeRate *
      this.VATvalue ; 
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
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

  deleteMultyItemFromAddonReciver(hash: string, multyId:number) {
    const index = this.addonReciver.findIndex((addon) => addon.hash === hash && addon.multyId === multyId);
    if (index !== -1) {
      this.addonReciver.splice(index, 1);
    }
  }

  getAddonTotalPrice(){
    return this.addonReciver.reduce((sum, obj) => sum + obj.price, 0);
  }

  setAddons(addons: IAddons[]) {
    this.addons = addons;
  }

  setHomeRate(homeRate: number) {
    this.homeRate = homeRate;
  }

  setActualRate(actualRate: number) {
    this.actualRate = 1 - actualRate / 100;
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
