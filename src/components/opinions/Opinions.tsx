import React from "react";

const opinions = [
  {
    id: 1,
    user: "Dan",
    text: "jestem zadowolona ze sprzatania. punktualność, szybkość pracy, ładny zapach detergentów. wykonawca uprzejmy. dziękuję.",
    stars: 5,
  },
  {
    id: 2,
    user: "Lara",
    text: "Wszystko w porządku. Mam kilka drobnych uwag, ale kwestia dogadania i uzgodnienia oczekiwań, więc ogólnie sprzątanie oceniam pozytywnie.",
    stars: 5,
  },
  {
    id: 3,
    user: "John",
    text: "Niesamowicie mila Pani bardzo sprawnie ogarnela cale mieszkanie. Wszystko bardzo profesjonalnie i na poziomie. Jestem niesamowicie wdzieczny i bardzo dziekuje za pomoc;)",
    stars: 3,
  },
  {
    id: 4,
    user: "Samanta",
    text: "Bardzo efektywny proces. Zamowilam usługę wieczorem na kolejny dzień. Mieszkanie pieknie posprzątane. Polecam serdecznie.",
    stars: 5,
  },
  {
    id: 5,
    user: "Ban",
    text: "Sprzątaczka przyszła punktualnie, bardzo dobrze wyczyściła toaletę, kuchnię i wszystkie pokoje. Bardzo zadbana dziewczyna. Polecam tę firmę!",
    stars: 4,
  },
];

export default function Opinions() {
  const [state, setState] = React.useState(1);
  const find = opinions.find((o, index) => index+1 === state);
  return (
    <section className="lg:my-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
    <div className="flex gap-x-10 justify-center lg:pt-10 lg:pb-10 px-2 xl:px-28 ">
        <div className="basis-20 text-6xl flex justify-center items-center"><button  onClick={()=>{setState(s=>{if(s>1){return s-1} else {return opinions.length}} )}}>-</button></div>      <div className="text-center basis-96">
        <div className="font-bolt text-5xl mb-5">{find.user}</div>
        <div className="font-bold">"{find.text}"</div>
      </div>
      <div className="basis-20 text-6xl  flex justify-center items-center"><button  onClick={()=>{setState(s=>{if(state<opinions.length){return s+1} else {return 1}})}}>+</button></div>
    </div>
    </section>
  );
}
