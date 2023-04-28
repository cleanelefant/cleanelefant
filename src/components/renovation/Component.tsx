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

function Component() {
  return (
    <div className='mx-8'>
      <div className='text-lg my-10 lg:text-4xl font-extrabold uppercase text-center'>
        Sprzątanie po remoncie Zielona Góra
      </div>
      <div className='flex flex-col lg:flex-row justify-center gap-y-10 lg:gap-x-10'>
        <div className='basis-3/4'>
          <Launcher />
          <div
            className=' flex flex-col lg:flex-row  flex-wrap gap-y-2 lg:gap-x-10  my-2 lg:mt-10 lg:mb-2'
            id='countres_order_page'
          >
            <AreaCounter />
            <WindowCounter />
          </div>
          <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center mt-10 lg:mt-20 '>
            Wybór terminu
          </div>
          <div
            className='flex flex-col 2xl:flex-row gap-5 mt-10'
            id='datepicker_order_page '
          >
            <Datepicker />
            <TimePicker />
          </div>
          <div id='adress_order_page'>
            <AdressForm />
            <ContactForm />
          </div>
          <ChoosePayment />
        </div>
        <div className='basis-1/4 flex '>
          <OrderCard />
        </div>
      </div>
    </div>
  );
}
export default observer(Component);
