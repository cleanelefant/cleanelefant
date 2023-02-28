/* eslint-disable react/display-name */
import React from "react";
import FormInput from "./FormInput";

// import axios from "axios";

const inputGroupStyles = {
  div: " px-3 mb-4 ",
  label: "block uppercase tracking-wide text-gray-700 text-xs font-bold py-2",
  input:
    "appearance-none block w-full focus:outline-none focus:bg-gray-700 bg-gray-100 text-gray-700 rounded p-5 mb-3  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white ",
  errorParagraf: "text-red-500 text-xs italic",
};

const AdressForm = () => {
  return (
    <div className='bg-white my-5'>
      <div className='text-3xl text-center font-bold p-5'>
        WPROWADŹ SWÓJ ADRES
      </div>
      <section className='grid-cols-1 lg:grid lg:grid-cols-4 gap-4'>
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Imię
          </label>
          <FormInput
            mykey={"street"}
            cl={inputGroupStyles.input}
            type='adress'
          />
        </div>
      </section>
    </div>
  );
};

export default AdressForm;
