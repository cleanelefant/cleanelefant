import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import InputMask from "react-input-mask";

interface IFormInput {
  mykey: string;
  cl: string;
  type: "adress" | "contact";
}

function MaskedFormInput({ mykey, cl, type }: IFormInput) {
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
    <InputMask mask='99-999' onChange={handleInputChange}>
      {() => <input className={cl} id={type} type='text' ref={inputRef} />}
    </InputMask>
  );
}

export default observer(MaskedFormInput);
