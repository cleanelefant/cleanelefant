import { makeAutoObservable } from "mobx";

export default class This {
  rooms: number;
  bedrooms: number;
  constructor() {
    makeAutoObservable(this);
    this.rooms = 1;
    this.bedrooms = 1;
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
