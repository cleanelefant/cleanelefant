import { observer } from "mobx-react-lite";
// Components
import Launcher from "./launcher/Launcher";
import AreaCounter from "./counters/AreaCounter";
import WindowCounter from "./counters/WindowCounter";
import Datepicker from "../renovation/datepicker/DatePicker";
import TimePicker from "../renovation/time_picker/TimePicker";
import OrderCard from "./order_card/OrderCard";
import AdressForm from "./forms/AdressForm";
import ContactForm from "./forms/ContactForm";
import ChoosePayment from "./payment/ChoosePayment";
import MobileOrderButton from "./mobile_order_button/MobileOrderButton";
import Steps from "./steps/Steps";
import OrderButton from "./order_button/OrderButton";
import React from "react";
import CheckRules from "./rules/CheckRules";

function Component() {
  return (
    <div className='scroll-smooth'>
      <Steps />
      <div className='mx-4 lg:mx-10'>
        <h1
          className='text-lg my-10 lg:text-4xl font-extrabold uppercase text-center scroll-mt-20'
          id='countres_order_page'
        >
          Sprzątanie po remoncie Zielona Góra
        </h1>
        <div className='flex flex-col lg:flex-row justify-center gap-y-10 lg:gap-x-10'>
          <div className='basis-3/4'>
            <Launcher />
            <div
              className=' flex flex-col lg:flex-row  flex-wrap gap-y-2 lg:gap-x-10  my-2 mt-10 lg:mb-2'
              id='countres_order_page'
            >
              <AreaCounter />
              <WindowCounter />
            </div>
            <div
              id='datepicker_order_page'
              className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center mt-10 lg:mt-20 scroll-mt-40 '
            >
              Wybór terminu
            </div>
            <div className='flex flex-col 2xl:flex-row gap-5 mt-10 '>
              <Datepicker />
              <TimePicker />
            </div>
            <div id='adress_order_page' className='scroll-mt-40'>
              <AdressForm />
              <ContactForm />
            </div>
            <ChoosePayment />
            <CheckRules />
            <OrderButton />
          </div>
          <div className='basis-1/4 flex '>
            <OrderCard />
          </div>
        </div>
        <MobileOrderButton />
      </div>
    </div>
  );
}
export default observer(Component);
