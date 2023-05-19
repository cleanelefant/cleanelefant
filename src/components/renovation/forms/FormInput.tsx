import { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React from "react";

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

    if (value) {
      if (mykey === "house") {
        store.setHouseError(false);
      }
      // if (mykey === "level") {
      //   store.setLevelError(false);
      // }
      // if (mykey === "local") {
      //   store.setLocalError(false);
      // }
      // if (mykey === "intercom") {
      //   store.setIntercomeError(false);
      // }
      // if (mykey === "name") {
      //   store.setNameError(false);
      // }
      if (mykey === "email") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isMail = regex.test(value);
        if (isMail) {
          store.setEmailError(false);
        } else {
          store.setEmailError(true);
        }
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
      } appearance-none block w-full focus:outline-none focus:bg-gray-500 text-gray-700 p-5  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white`}
      id={type}
      type='text'
      ref={inputRef}
      onChange={handleInputChange}
    />
  );
}

export default observer(FormInput);
