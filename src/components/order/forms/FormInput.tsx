import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

interface IFormInput {
  mykey: string;
  cl: string;
  type: "adress" | "contact";
}

function FormInput({ mykey, cl, type }: IFormInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { store } = useContext(Context);

  const handleInputChange = () => {
    const value = inputRef.current?.value;
    if ((type = "adress")) {
      store.adressFormHandler(mykey, value);
    }
    if ((type = "contact")) {
      store.contactFormHandler(mykey, value);
    }
  };

  return (
    <input
      className={cl}
      id={type}
      type='text'
      ref={inputRef}
      onChange={handleInputChange}
    />
  );
}

export default observer(FormInput);
