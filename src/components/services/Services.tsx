import cleaning from "../../images/services/household.png";
import renovation from "../../images/services/paint-roller.png";
import window from "../../images/services/windows.png";
import sofa from "../../images/services/sofa.png";
import handyman from "../../images/services/wrench-tool.png";
import kitchen from "../../images/services/kitchen.png";
import car from "../../images/services/car.png";
import office from "../../images/services/office-building.png";
import home from "../../images/services/home.png";

import useIntersection from "../../utils/useObserver";

const services = [
  { id: 1, src: cleaning, title: "Sprzątanie mieszkania", link: "./test" },
  { id: 2, src: renovation, title: "Sprzątanie po remoncie", link: "./test" },
  { id: 3, src: window, title: "Mycie okien", link: "./test" },
  {
    id: 4,
    src: sofa,
    title: "Czyszczenie chemiczne mebli i kanap",
    link: "./test",
  },
  {
    id: 5,
    src: handyman,
    title: "Złota rączka",
    link: "./test",
  },
  {
    id: 6,
    src: kitchen,
    title: "Sprzątanie kuchni",
    link: "./test",
  },
  {
    id: 7,
    src: car,
    title: "Mycie i sprzątanie samochodu",
    link: "./test",
  },

  {
    id: 8,
    src: office,
    title: "Sprzątanie biur",
    link: "./test",
  },
  {
    id: 9,
    src: home,
    title: "Sprzątanie domu prywatnego i działki",
    link: "./test",
  },
];

export default function Services() {
  const { bottomRef, topRef, intersection } = useIntersection();
  return (
    <section className='relative'>
      <div className='absolute top-[-120px] h-px' ref={topRef}></div>
      <div className='text-center lg:pt-10 pb-5 font-medium'>
        <p className='pb-5 lg:pb-10 font-bold text-3xl lg:text-6xl'>
          Wszystkie nasze usługi
        </p>
        <div className='flex flex-wrap gap-x-2 gap-y-4 justify-center 2xl:mx-40 pb-5'>
          {services.map((s) => (
            <a
              className='basis-[150px] lg:basis-[250px] p-5 lg:p-10 rounded-lg shadow-lg bg-white hover:bg-neutral-100 max-w-sm  flex flex-col justify-center items-center gap-y-2 transition duration-150 ease-in-out'
              href={s.link}
            >
              <img
                className=''
                src={intersection ? s.src : " "}
                alt={s.title}
                width={64}
                height={64}
              />
              <div className='text-[12px] 2xl:text-lg'>{s.title}</div>
            </a>
          ))}
        </div>
      </div>
      <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
    </section>
  );
}
