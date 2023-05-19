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
        <div className='bg-white w-full h-40 mx-auto my-20 m px-10 py-5'>
          <SMSCodeInput />
          <button
            className='border-4'
            onClick={() => {
              setIsModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default SmsModal;
