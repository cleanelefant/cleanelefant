import { advantages } from "../../utils/advantages";
// import useIntersection from "../../utils/useObserver";

export default function Advantages() {
  // const { bottomRef, topRef, intersection } = useIntersection();
  return (
    <div className='relative'>
      {/* <div className='absolute top-[-120px] h-px' ref={topRef}></div> */}
      <ul className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8 justify-between pb-4 lg:pb-5 text-sm lg:text-lg'>
        {advantages.map((item) => (
          <li key={item.id} className='text-center p-2 lg:p-8 '>
            <div className='flex justify-center items-center mb-5'>
              <div>
                <img
                  className='hidden lg:block'
                  // src={intersection ? item.src : ""}
                  src={item.src}
                  alt={item.title}
                  width={128}
                  height={128}
                />
              </div>
            </div>
            <div className='flex justify-center items-center mb-4'>
              <img
                className='lg:hidden'
                // src={intersection ? item.src : ""}
                src={item.src}
                alt={item.title}
                width={64}
                height={64}
              />
            </div>
            <p className='font-bold lg:text-xl mb-2'>{item.title}</p>
            <p className='text-sm'>{item.text}</p>
          </li>
        ))}
      </ul>
      {/* <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div> */}
    </div>
  );
}
