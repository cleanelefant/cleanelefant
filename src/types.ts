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

export interface IServiceTime {
  hours: number;
  minutes: number;
}

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
  id: number;
  title: string;
  price: number;
  slug: string;
  src: string;
  isOrderPage: boolean;
  isPreHours: boolean;
  isMultiply: boolean;
  minutes: number;
}

export interface ExtendedIAddons extends IAddons {
  isActive: boolean;
  hash: string;
}

export interface IAddonReciver {
  hash: string;
  title: string;
  price: number;
  multyId?: number;
  src: string;
  minutes: number;
}

export interface ITime {
  id: number;
  hours: string;
  minutes: string;
}

export interface ExtendedITime extends ITime {
  isActive: boolean;
  isModal: boolean;
}

export interface IMinutes {
  id: number;
  value: string;
}

export interface ExtendedIMinutes extends IMinutes {
  isActive: boolean;
}

export interface IErrorOrderPage {
  isError: boolean;
  text: string;
  target: string;
  level: number;
}

interface IDateErrors extends IErrorOrderPage {}
interface ITimeErrors extends IErrorOrderPage {}
interface IStreetErrors extends IErrorOrderPage {}
interface IZipErrors extends IErrorOrderPage {}
interface IHouseErrors extends IErrorOrderPage {}
interface ILocalErrors extends IErrorOrderPage {}
interface ILevelErrors extends IErrorOrderPage {}
interface IIntercomErrors extends IErrorOrderPage {}
interface INameErrors extends IErrorOrderPage {}
interface IPhoneErrors extends IErrorOrderPage {}
interface IEmailErrors extends IErrorOrderPage {
  isEmailValidDataError: boolean;
}

export interface IErrors {
  dateError: IDateErrors;
  timeError: ITimeErrors;
  streetError: IStreetErrors;
  zipError: IZipErrors;
  houseError: IHouseErrors;
  localErrors: ILocalErrors;
  levelErrors: ILevelErrors;
  intercomErrors: IIntercomErrors;
  nameErrors: INameErrors;
  phoneErrors: IPhoneErrors;
  emailErrors: IEmailErrors;
}

export interface IFormInput {
  name: string;
  zip: string;
  email: string;
  phone: string;
  status: string;
  message: string;
}

export interface IAdressForm {
  street: string;
  zip: string;
  house: string;
  local: string;
  level: string;
  intercom: string;
}

export interface IContactForm {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export interface IStep {
  id: number;
  title: string;
  target: string;
  isActive: boolean;
}
