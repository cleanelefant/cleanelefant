import { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import InputMask from "react-input-mask";

interface IMaskedFormInput {
  mykey: string;
  type: "adress" | "contact";
  mask: string;
  isError: boolean;
}

function MaskedFormInput({ mykey, type, mask, isError }: IMaskedFormInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { store } = useContext(Context);

  const handleInputChange = () => {
    const value = inputRef.current?.value;
    if (type === "adress") {
      store.adressFormHandler(mykey, value);
    }
    if (type === "contact") {
      store.contactFormHandler(mykey, value);
    }
    if (mykey === "phone") {
      const regex = /^\+48\s\d{3}-\d{3}-\d{3}$/;

      if (regex.test(value)) {
        store.setPhoneError(false);
      } else {
        store.setPhoneError(true);
      }
    }
  };

  return (
    <InputMask mask={mask} onChange={handleInputChange}>
      {() => (
        <input
          className={`${
            isError ? "bg-rose-300 " : "bg-gray-100"
          } appearance-none block w-full focus:outline-none focus:bg-gray-500 text-gray-700 p-5 mb-3  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white`}
          id={type}
          type='text'
          ref={inputRef}
        />
      )}
    </InputMask>
  );
}

export default observer(MaskedFormInput);
