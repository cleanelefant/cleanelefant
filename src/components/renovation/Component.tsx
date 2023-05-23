import React from "react";
import { observer } from "mobx-react-lite";
//Context
import { Context } from "./index";
// Components
import Launcher from "../common_components/launcher/Launcher";
import AreaCounter from "./counters/AreaCounter";
import WindowCounter from "./counters/WindowCounter";
import Datepicker from "../renovation/datepicker/DatePicker";
import TimePicker from "../renovation/time_picker/TimePicker";
import OrderCard from "./order_card/OrderCard";
import AdressForm from "./forms/AdressForm";
import ContactForm from "./forms/ContactForm";
import ChoosePayment from "../common_components/payment/ChoosePayment";
import MobileOrderButton from "./mobile_order_button/MobileOrderButton";
// import Steps from "./steps/Steps";
import OrderButton from "./order_button/OrderButton";
import CheckRules from "../common_components/rules/CheckRules";
import Rodo from "../common_components/rules/Rodo";
import AddWashing from "./additional_services/AddWashing";
import SmsModal from "../common_components/sms_modal/Modal";

function Component() {
  const { store } = React.useContext(Context);
  // console.log("store", store);
  const topComercialDataRef = React.useRef<HTMLDivElement>(null);
  const bottomComercialDataRef = React.useRef<HTMLDivElement>(null);
  const topTimeDataRef = React.useRef<HTMLDivElement>(null);
  const bottomTimeDataRef = React.useRef<HTMLDivElement>(null);
  const topAdressDataRef = React.useRef<HTMLDivElement>(null);
  const bottomAdressDataRef = React.useRef<HTMLDivElement>(null);
  const topPaymentDataRef = React.useRef<HTMLDivElement>(null);
  const bottomPaymentDataRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const position = 1;
    const topObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    if (topComercialDataRef.current) {
      topObserver.observe(topComercialDataRef.current);
    }
    if (bottomComercialDataRef.current) {
      bottomObserver.observe(bottomComercialDataRef.current);
    }
    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const position = 2;
    const topObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    if (topTimeDataRef.current) {
      topObserver.observe(topTimeDataRef.current);
    }
    if (bottomTimeDataRef.current) {
      bottomObserver.observe(bottomTimeDataRef.current);
    }
    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const position = 3;
    const topObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    if (topTimeDataRef.current) {
      topObserver.observe(topAdressDataRef.current);
    }
    if (bottomTimeDataRef.current) {
      bottomObserver.observe(bottomAdressDataRef.current);
    }
    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);
  React.useEffect(() => {
    const position = 4;
    const topObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    const bottomObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        store.setActualStep(position);
      }
    });
    if (topTimeDataRef.current) {
      topObserver.observe(topPaymentDataRef.current);
    }
    if (bottomTimeDataRef.current) {
      bottomObserver.observe(bottomPaymentDataRef.current);
    }
    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

  const setVat = (value: number) => {
    store.setVat(value);
  };
  const setIsModal = (value: boolean) => {
    store.setIsModal(value);
  };
  const setIsRodoChecked = (value: boolean) => {
    store.setIsRodoChecked(value);
  };

  const setIsRulesChecked = (value: boolean) => {
    store.setIsRulesChecked(value);
  };

  const setRulesError = (value: boolean) => {
    store.setRulesError(value);
  };

  const setIsCash = (value: boolean) => {
    store.setIsCash(value);
  };

  const paymentProps = {
    setIsCash,
    isCash: store.isCash,
  };

  const launcherProps = { setVat };

  const smsModalProps = {
    isModal: store.isModal,
    setIsModal,
  };
  const rodoProps = {
    isRodoChecked: store.isRodoChecked,
    setIsRodoChecked,
  };

  const rulesProps = {
    isRulesChecked: store.isRulesChecked,
    setIsRulesChecked,
    setRulesError,
    target: store.pageErrors.rulesError.target,
    isError: store.pageErrors.rulesError.isError,
  };

  return (
    <div className='scroll-smooth'>
      <SmsModal {...smsModalProps} />
      <div className='mx-4 lg:mx-20'>
        <h1
          className='text-lg mt-10 mb-5 lg:mb-10 lg:text-4xl font-extrabold uppercase scroll-mt-20 text-center'
          id='countres_order_page'
        >
          Sprzątanie po remoncie Zielona Góra
        </h1>
        <div className='flex flex-col lg:flex-row justify-center gap-y-10 lg:gap-x-5'>
          <div className='basis-2/3'>
            <div ref={topComercialDataRef}></div>
            <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
              MIESZKANIE PO REMONCIE
            </div>
            <div className='mt-5 lg:mt-10'>
              <Launcher {...launcherProps} />
            </div>
            <div
              className='flex flex-col lg:flex-row mt-10 lg:mt-20'
              id='countres_order_page'
            >
              <div className='flex-1'>
                <AreaCounter />
                {store.area_price ? (
                  <div className='flex justify-center items-center'>
                    <div className='px-12 py-2 lg:py-4 my-5 lg:my-10 bg-yellow-500 font-bold lg:text-xl rounded'>
                      {store.area_price} zł./m2
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className='flex-1'>
                <WindowCounter />
                {store.window_price ? (
                  <div className='flex justify-center items-center'>
                    <div className='px-12 py-2 lg:py-4 mt-5  lg:my-10 bg-yellow-500 font-bold lg:text-xl rounded'>
                      {store.window_price} zł.
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <AddWashing />
            <div ref={bottomComercialDataRef}></div>
            <div
              id='datepicker_order_page'
              className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center mt-10 lg:mt-20 scroll-mt-40 '
            >
              Wybór terminu
            </div>
            <div ref={topTimeDataRef}></div>
            <div className='flex flex-col 2xl:flex-row gap-5 mt-10 '>
              <Datepicker />
              <TimePicker />
            </div>
            <div ref={bottomTimeDataRef}></div>
            <div ref={topAdressDataRef}></div>
            <div id='adress_order_page' className='scroll-mt-40'>
              <AdressForm />
              <ContactForm />
            </div>
            <div ref={bottomAdressDataRef}></div>
            <div ref={topPaymentDataRef}></div>
            <ChoosePayment {...paymentProps} />
            <div ref={bottomPaymentDataRef}></div>
            <CheckRules {...rulesProps} />
            <Rodo {...rodoProps} />
            <OrderButton />
          </div>
          <div className='basis-1/3 flex '>
            <OrderCard />
          </div>
        </div>
        <MobileOrderButton />
      </div>
    </div>
  );
}
export default observer(Component);
