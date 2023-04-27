import { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

function FormTextarea() {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { store } = useContext(Context);

  const handleInputChange = () => {
    const value = inputRef.current?.value;
    store.contactFormHandler("notes", value);
  };

  return (
    <textarea
      className={` appearance-none block w-full h-52 bg-gray-100 focus:outline-none focus:bg-gray-500 text-gray-700 p-5 text-xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white`}
      id='notes'
      ref={inputRef}
      onChange={handleInputChange}
    />
  );
}

export default observer(FormTextarea);
