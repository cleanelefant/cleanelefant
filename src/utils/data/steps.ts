import { IStep } from "../../types";

export const steps: IStep[] = [
  {
    id: 1,
    title: "Wybór usług",
    target: "#countres_order_page",
    isActive: true,
  },
  {
    id: 2,
    title: "Wybór terminu",
    target: "#datepicker_order_page",
    isActive: false,
  },
  {
    id: 3,
    title: "Adres i dane kontaktowe",
    target: "#adress_order_page",
    isActive: false,
  },
  {
    id: 4,
    title: "Wybór sposobu opłaty",
    target: "#payment_order_page",
    isActive: false,
  },
];
