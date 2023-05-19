import React from "react";
import { observer } from "mobx-react-lite";
// Components
import SMSCodeInput from "./sms_input/SMSinputs";

interface ISmsModal {
  isModal: boolean;
  setIsModal(value: boolean): void;
}

function SmsModal({ isModal, setIsModal }: ISmsModal) {
  if (isModal) {
    return (
      <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/90 z-50 '>
        <div className=' w-full  mx-auto my-20 m px-10 py-5 flex justify-end'>
          <button
            className='w-14 h-14 rounded-full border-4 border-gray-500 flex items-center justify-center'
            onClick={() => {
              setIsModal(false);
            }}
          >
            <svg
              className='w-12 h-12 text-gray-500'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M6 18L18 6M6 6l12 12'></path>
            </svg>
          </button>
        </div>
        <SMSCodeInput />
      </div>
    );
  }
}

export default SmsModal;
