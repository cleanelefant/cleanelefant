import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// Context
import { Context } from "./index";
import Launcher from "./launcher/Launcher";
import AreaCounter from "./counters/AreaCounter";
import WindowCounter from "./counters/WindowCounter";
import Datepicker from "../renovation/datepicker/DatePicker";
import TimePicker from "../order/time_picker/TimePicker";
import { ExtendedITime } from "../../types";
import { times } from "../../utils/times";

// Components

function Component() {
  const { store } = useContext(Context);
  React.useEffect(() => {}, []);

  return (
    <div className='my-20 mx-10'>
      <div className='text-lg my-10 lg:text-4xl font-extrabold uppercase text-center'>
        Sprzątanie po remoncie Zielona Góra
      </div>
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
    </div>
  );
}
export default observer(Component);
