import React from "react";
import gold from "../../images/opinion/star_gold.png";
import silver from "../../images/opinion/star.png";
import useIntersection from "../../utils/useObserver";

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
  const { bottomRef, topRef, intersection } = useIntersection();
  const find = opinions.find((o, index) => index + 1 === state);
  const stars = [
    { id: 1, isGold: false },
    { id: 2, isGold: false },
    { id: 3, isGold: false },
    { id: 4, isGold: false },
    { id: 5, isGold: false },
  ];
  const maped_stars = stars.map((s) => {
    if (s.id < find.stars + 1) {
      return { ...s, isGold: true };
    } else {
      return s;
    }
  });

  return (
    <section className=' bg-gradient-to-r from-blue-500 to-cyan-500 text-white  relative'>
      <div className='absolute top-[-20px] h-px' ref={topRef}></div>
      <div className='flex gap-x-10 justify-center lg:pt-10 lg:pb-10 px-2 xl:px-28 '>
        <div className='basis-20 text-6xl flex justify-center items-center'>
          <button
            onClick={() => {
              setState((s) => {
                if (s > 1) {
                  return s - 1;
                } else {
                  return opinions.length;
                }
              });
            }}
          >
            -
          </button>
        </div>{" "}
        <div className='text-center basis-96'>
          <div className='font-bolt text-5xl mb-5'>{find.user}</div>
          <div className='font-bold'>"{find.text}"</div>
          <div className='flex justify-between gap-x-2 mt-4'>
            {maped_stars.map((star) => (
              <img
                src={!intersection ? " " : star.isGold ? gold : silver}
                alt='star'
                width={32}
                height={32}
              />
            ))}
          </div>
        </div>
        <div className='basis-20 text-6xl  flex justify-center items-center'>
          <button
            onClick={() => {
              setState((s) => {
                if (state < opinions.length) {
                  return s + 1;
                } else {
                  return 1;
                }
              });
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
    </section>
  );
}
