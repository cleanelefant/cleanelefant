
import useIntersection from "../../utils/useObserver";
import messanger from "../../images/messanger/messenger.png";
import telegram from "../../images/messanger/telegram.png";
import whatsapp from "../../images/messanger/whatsapp.png";

export default function Chats() {
  const { bottomRef, topRef, intersection } = useIntersection();
  return (
    <div className="relative">
      <div className="absolute top-[-20px] h-px" ref={topRef}></div>
      <div className="flex flex-wrap gap-y-4 gap-x-16 my-10 font-bold text-neutral-700 justify-center">
        <a
          href="https://m.me/igor.rak.184"
          className="flex gap-x-4 bg-slate-200 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white transition duration-300 py-3 px-6 rounded-3xl items-center"
        >
          <img
            src={intersection ? messanger : ""}
            width={32}
            height={32}
            alt={"messanger"}
          />
          <p>messanger</p>
        </a>
        <a
          href="tg://resolve?domain=cleanwhalewarsaw"
          className="flex gap-x-4 bg-slate-200 hover:bg-gradient-to-r from-blue-700 to-cyan-500 hover:text-white transition duration-300 py-3 px-6 rounded-3xl items-center"
        >
          <img
            src={intersection ? telegram : ""}
            width={32}
            height={32}
            alt={"telegram"}
          />
          <p>telegram</p>
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=48690483990"
          className="flex gap-x-4 bg-slate-200 hover:bg-gradient-to-r from-green-700 to-green-500  hover:text-white transition duration-300 py-3 px-6 rounded-3xl items-center"
        >
          <img
            src={intersection ? whatsapp : ""}
            width={32}
            height={32}
            alt={"whatsapp"}
          />
          <p>whatsapp</p>
        </a>{" "}
      </div>
      <div className="absolute top-[-20px] h-px" ref={bottomRef}></div>
    </div>
  );
}
