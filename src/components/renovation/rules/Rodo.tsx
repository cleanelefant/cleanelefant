import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React from "react";

function Rodo() {
  const { store } = useContext(Context);
  const handleCheckboxChange = () => {
    store.setIsRodoChecked(!store.isRodoChecked);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='mb-4'>
        <label className='flex items-center justify-center cursor-pointer'>
          <div className='relative'>
            <input
              type='checkbox'
              checked={store.isRodoChecked}
              onChange={handleCheckboxChange}
              className='sr-only'
            />
            <div
              className={`w-8 h-8 ${
                store.pageErrors.rulesError.isError ? "bg-rose-300" : "bg-white"
              } rounded-sm border border-black transition-all duration-200 ease-out absolute left-0`}
            ></div>
            {store.isRodoChecked && (
              <svg
                className='w-7 h-7 text-black fill-current absolute left-0.5 top-0.5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
              </svg>
            )}
          </div>
        </label>
      </div>
      <div
        className={`ml-10 flex justify-center items-center gap-x-3 mt-4text-gray-700  select-none  text-lg lg:text-xl`}
      >
        <p>
          Nie wyrażam zgody na wykorzystanie moich danych osobowych do celów
          związanych z przesyłaniem subskrypcji oraz oferty marketingowej
        </p>
      </div>
    </div>
  );
}

export default observer(Rodo);
