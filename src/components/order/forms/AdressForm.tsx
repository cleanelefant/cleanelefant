/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// Context
import { Context } from "../index";
// Components
import FormInput from "./FormInput";
import MaskedFormInput from "./MaskedFormInput";

// import axios from "axios";

const getInputGroupStyles = () => {
  return {
    div: "px-3 mb-4 ",
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold py-2",
    input:
      "appearance-none block w-full focus:outline-none focus:bg-gray-700 bg-gray-100 text-gray-700 rounded p-5 mb-3  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white ",
    errorParagraf: "text-red-500 text-xs italic",
  };
};

function AdressForm() {
  const inputGroupStyles = getInputGroupStyles();
  const { store } = useContext(Context);
  const myRef = React.useRef(null);
  React.useEffect(() => {
    if (store.pageErrors.streetError.isStreetError) {
      myRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      return;
    }
  }, [store.pageErrors.streetError.isStreetError]);
  return (
    <div className='bg-white my-5' ref={myRef}>
      <div className='text-3xl text-center font-bold p-5'>
        WPROWADŹ SWÓJ ADRES
      </div>
      <section className='grid-cols-1 lg:grid lg:grid-cols-4 gap-4'>
        {/* Street */}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Ulica
          </label>
          <FormInput
            mykey={"street"}
            type='adress'
            isError={store.pageErrors.streetError.isStreetError}
          />
        </div>
        {/* Zip Code */}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Kod pocztowy
          </label>
          <MaskedFormInput
            mykey={"zip"}
            cl={inputGroupStyles.input}
            type='adress'
          />
        </div>
        {/* House Number*/}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Numer domu
          </label>
          <FormInput
            mykey={"house"}
            type='adress'
            isError={store.pageErrors.houseError.isHouseError}
          />
        </div>
        {/* Piętro*/}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Numer mieszkania
          </label>
          <FormInput
            mykey={"local"}
            type='adress'
            isError={store.pageErrors.localErrors.isLocalError}
          />
        </div>
        {/* Flat Number*/}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Piętro
          </label>
          <FormInput
            mykey={"level"}
            type='adress'
            isError={store.pageErrors.levelErrors.isLevelError}
          />
        </div>
        {/* Flat Number*/}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Kod od domofonu
          </label>
          <FormInput
            mykey={"intercom"}
            type='adress'
            isError={store.pageErrors.intercomErrors.isIntercomError}
          />
        </div>
      </section>
    </div>
  );
}

export default observer(AdressForm);
