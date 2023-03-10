/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// Context
import { Context } from "../index";
// Components
import FormInput from "./FormInput";
import MaskedFormInput from "./MaskedFormInput";
import FormTextarea from "./FormTextarea";

const getInputGroupStyles = () => {
  return {
    div: "px-3 mb-4 ",
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold py-2",
    input:
      "appearance-none block w-full focus:outline-none focus:bg-gray-700 bg-gray-100 text-gray-700 rounded p-5 mb-3  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white ",
    errorParagraf: "text-red-500 text-xs italic",
  };
};

function ContactForm() {
  const inputGroupStyles = getInputGroupStyles();
  const { store } = useContext(Context);
  // const myRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (store.pageErrors.streetError.isError) {
  //     myRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  //     return;
  //   }
  // }, [store.pageErrors.streetError.isError]);
  return (
    <div className='bg-white my-5' id='contact_form_order_page'>
      <div className='text-3xl text-center font-bold p-5'>DANE KONTAKTOWE</div>
      <section className='grid-cols-1 lg:grid lg:grid-cols-3 gap-4'>
        {/* Name */}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Imię
          </label>
          <FormInput
            mykey={"name"}
            type={"contact"}
            isError={store.pageErrors.nameErrors.isError}
          />
        </div>
        {/* Phone */}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Telefon kontaktowy
          </label>
          <MaskedFormInput
            mykey={"phone"}
            type='contact'
            mask='+48\ 999-999-999'
            isError={store.pageErrors.phoneErrors.isError}
          />
        </div>
        {/* Email*/}
        <div className={inputGroupStyles.div}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Email
          </label>
          <FormInput
            mykey={"email"}
            type='contact'
            isError={store.pageErrors.emailErrors.isError}
          />
        </div>
        <div className={"px-3 mb-4 col-span-3 "}>
          <label className={inputGroupStyles.label} htmlFor='name'>
            Dodatkowa informacja do zamówienia
          </label>
          <FormTextarea />
        </div>
      </section>
    </div>
  );
}

export default observer(ContactForm);
