import React from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import chat from "../../images/chat_f.png";
import messanger from "../../images/messenger_m.png";
import telegram from "../../images/telegram_m.png";
import watsapp from "../../images/whatsapp_m.png";

export default function Chat() {
  const [state, setState] = React.useState(false);

  return (
    <MobileView>
      <div id='chat_123' className='fixed lg:hidden bottom-5 right-5 z-50'>
        {state && (
          <div className='flex flex-col gap-y-4'>
            <a href='https://m.me/igor.rak.184'>
              <img src={messanger} width={64} height={64} alt={"messanger"} />
            </a>
            <a href='tg://resolve?domain=cleanwhalewarsaw'>
              <img src={telegram} width={64} height={64} alt={"telegram"} />
            </a>
            <a href='https://api.whatsapp.com/send?phone=48690483990'>
              <img src={watsapp} width={64} height={64} alt={"messanger"} />
            </a>
          </div>
        )}
        <button
          aria-label='Chat'
          className='mt-5 w-[64px] h-[64px] rounded-full bg-center bg-cover'
          style={{ backgroundImage: `url(${chat})` }}
          onClick={() => {
            setState((s) => !s);
          }}
        ></button>
      </div>
    </MobileView>
  );
}
