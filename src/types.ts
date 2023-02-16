export type OrderStateType = {
  room: number;
  bedroom: number;
};

export type rateType = {
  id: number;
  title: string;
  discount: number;
  link: string;
  isCurent: boolean;
};

export type priceType = {
  id: number;
  title: string;
  description: string;
  room: number;
  price: number;
  itemPropName: string;
};

export type questionsType = {
  id: number;
  question: string;
  answer: string;
  isVisible: boolean;
};

export interface IPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  src?: string;
  double: string;
  text: string;
  date: string;
  target?: string;
}

export interface IOurServices {
  id: number;
  slug: string;
  title: string;
  target?: string;
  text: string;
}


export interface IAddons {
  id:number
  title: string;
  price: number;
  slug: string;
  src:string;
  isOrderPage:boolean;
  isPreHours:boolean;
  isMultiply:boolean; 
}

export interface ExtendedIAddons extends IAddons {
  isActive: boolean;
  hash: string;
}


export interface IAddonReciver{
  hash:string,
  title:string,
  price:number,
  multyId?:number 
}

export interface ITime {
  id:number,
  hours:string,
  minutes:string
}

export interface ExtendedITime extends ITime {
  isActive: boolean; 
  isModal: boolean;
}


