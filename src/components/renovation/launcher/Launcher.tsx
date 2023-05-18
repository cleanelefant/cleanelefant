import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

interface ILauncher {
  setVat(value: number): void;
  vat: number;
}

function Launcher({ setVat, vat }: ILauncher) {
  const [isActive, setIsActive] = React.useState(false);
  const { store } = useContext(Context);
  const privateClickHandler = () => {
    setIsActive(false);
    setVat(1);
  };
  const companyClickHandler = () => {
    setIsActive(true);
    setVat(vat);
  };

  return (
    <div className='flex gap-x-4 text-lg lg:text-3xl font-bold '>
      <button
        className={`py-6 px-8  transition-transform drop-shadow-xl rounded ${
          isActive ? "bg-slate-200" : "bg-blue-700 text-white"
        }`}
        onClick={privateClickHandler}
      >
        Osoba prywatna
      </button>
      <button
        className={`py-6 px-8  transition-transform drop-shadow-xl rounded ${
          !isActive ? "bg-slate-200" : "bg-blue-700 text-white"
        }`}
        onClick={companyClickHandler}
      >
        Firma
      </button>
    </div>
  );
}

export default observer(Launcher);
