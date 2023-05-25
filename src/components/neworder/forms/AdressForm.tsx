/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// Context
import { Context } from "../index";
// Components
import FormInput from "./FormInput";
import MaskedFormInput from "./MaskedFormInput";

const getInputGroupStyles = () => {
  return {
    div: "",
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold py-2",
    input:
      "appearance-none block w-full focus:outline-none focus:bg-gray-700 bg-gray-100 text-gray-700 rounded p-5  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white ",
    errorParagraf: "text-red-500 text-xs italic",
  };
};

function AdressForm() {
  const inputGroupStyles = getInputGroupStyles();
  const { store } = useContext(Context);

  return (
    <div className='mt-20' id='adress_form_order_page'>
      <div className='uppercase lg:text-3xl font-extrabold text-gray-700 text-center'>
        WPROWADŹ SWÓJ ADRES
      </div>
      <section className='grid-cols-1 lg:grid lg:grid-cols-4 gap-4 drop-shadow-xl bg-slate-50 mt-10 p-5'>
        {/* Street */}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Ulica
          </label>
          <FormInput
            mykey={"street"}
            type='adress'
            isError={store.pageErrors.streetError.isError}
          />
        </div>
        {/* Zip Code */}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='zip'>
            Kod pocztowy
          </label>
          <MaskedFormInput
            mykey={"zip"}
            type='adress'
            mask='99-999'
            isError={store.pageErrors.zipError.isError}
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
            isError={store.pageErrors.houseError.isError}
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
            isError={store.pageErrors.localErrors.isError}
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
            isError={store.pageErrors.levelErrors.isError}
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
            isError={store.pageErrors.intercomErrors.isError}
          />
        </div>
      </section>
    </div>
  );
}

export default observer(AdressForm);
