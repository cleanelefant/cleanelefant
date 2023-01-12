import React from "react";

import chat from "../images/chat.png";
import messanger from "../images/messenger_m.png";
import telegram from "../images/telegram_m.png";
import watsapp from "../images/whatsapp_m.png";

export default function Chat() {
  const [state, setState] = React.useState(false);

  return (
    <div id='chat_123' className='fixed lg:hidden bottom-5 right-5'>
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
        className='mt-5'
        onClick={() => {
          setState((s) => !s);
        }}
      >
        <img src={chat} width={64} height={64} alt={"chat"} />
      </button>
    </div>
  );
}
