// import { observable, action } from "mobx";

import { makeAutoObservable } from "mobx";

export default class Store {
  naming = { pokoj: "pokój", lazienka: "łazienka" };
  rooms: number;
  bedrooms: number;
  basePrise: number;
  roomPrise: number;
  bedroomPrise: number;
  VATvalue:number;
  rate:number;

  constructor() {
    makeAutoObservable(this);
    this.rooms=1;
    this.bedrooms=1;
    this.bedroomPrise=30;
    this.roomPrise=40;
    this.basePrise=80;
    this.VATvalue=1
  }

  calculateTotalPrise(){
    return  (this.basePrise + (this.roomPrise*this.rooms) + (this.bedroomPrise*this.bedrooms))*this.VATvalue
  }

  setBasePrice(basePrise:number){
    this.basePrise = basePrise;
  }

  setRoomPrice(roomPrise:number){
    this.roomPrise = roomPrise;
  }

  setBedPrice(bedroomPrise:number){
    this.bedroomPrise = bedroomPrise;
  }


  setVATvalue(VATvalue:number){
    this.VATvalue = VATvalue
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
