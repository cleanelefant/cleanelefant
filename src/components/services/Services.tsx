import useIntersection from "../../utils/useObserver";
import { services } from "../../utils/services";

export default function Services() {
  const { bottomRef, topRef, intersection } = useIntersection();
  return (
    <section className='relative'>
      <div className='absolute top-[-120px] h-px' ref={topRef}></div>
      <div className='text-center lg:pt-10 pb-5 font-medium'>
        <p className='pb-5 lg:pb-10 font-bold text-3xl lg:text-6xl'>
          Wszystkie nasze usługi
        </p>
        <div className='flex flex-wrap gap-x-2 gap-y-4 justify-center 2xl:mx-[200px] pb-5'>
          {services.map((s) => (
            <a
              className='basis-[150px] lg:basis-[250px] p-5 lg:p-10 rounded-lg shadow-lg bg-white hover:bg-neutral-100 max-w-sm  flex flex-col justify-center items-center gap-y-2 transition duration-150 ease-in-out'
              href={s.link}
              key={s.id}
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
