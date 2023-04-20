import { makeAutoObservable } from "mobx";

export default class This {
  area: number;
  windows: number;
  constructor() {
    makeAutoObservable(this);
    this.area = 0;
    this.windows = 0;
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
}
