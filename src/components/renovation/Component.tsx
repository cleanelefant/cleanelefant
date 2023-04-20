import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// Context
import { Context } from "./index";
import Launcher from "./launcher/Launcher";
import AreaCounter from "./counters/AreaCounter";
import WindowCounter from "./counters/WindowCounter";

// Components

function Component() {
  const { store } = useContext(Context);

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
    </div>
  );
}
export default observer(Component);
