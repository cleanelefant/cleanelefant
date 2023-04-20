import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

function Launcher() {
  const [isCliced, setIsCliced] = React.useState(false);
  const { store } = useContext(Context);
  const privateClickHandler = () => {
    setIsCliced(false);
    // store.setVATvalue(1);
  };
  const companyClickHandler = () => {
    setIsCliced(true);
    // store.setVATvalue(1.23);
  };
  return (
    <div className='flex gap-x-4 text-lg lg:text-3xl font-bold '>
      <button
        className={`py-6 px-8  transition-transform drop-shadow-xl rounded ${
          isCliced ? "bg-slate-200" : "bg-blue-700 text-white"
        }`}
        onClick={privateClickHandler}
      >
        Osoba prywatna
      </button>
      <button
        className={`py-6 px-8  transition-transform drop-shadow-xl rounded ${
          !isCliced ? "bg-slate-200" : "bg-blue-700 text-white"
        }`}
        onClick={companyClickHandler}
      >
        Firma
      </button>
    </div>
  );
}

export default observer(Launcher);
