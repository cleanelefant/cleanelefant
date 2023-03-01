import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { toJS } from "mobx";

interface IFormInput {
  mykey: string;
  type: "adress" | "contact";
  isError: boolean;
}

function FormInput({ mykey, type, isError }: IFormInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { store } = useContext(Context);

  const handleInputChange = () => {
    const value = inputRef.current?.value;

    if (value.length > 2) {
      if (mykey === "street") {
        store.setStreetError(false);
      }
    }

    if ((type = "adress")) {
      store.adressFormHandler(mykey, value);
    }
    if ((type = "contact")) {
      store.contactFormHandler(mykey, value);
    }
  };

  return (
    <input
      className={`${
        isError ? "bg-rose-300 " : "bg-gray-100"
      } appearance-none block w-full focus:outline-none focus:bg-gray-700 text-gray-700 p-5 mb-3  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white`}
      id={type}
      type='text'
      ref={inputRef}
      onChange={handleInputChange}
    />
  );
}

export default observer(FormInput);
