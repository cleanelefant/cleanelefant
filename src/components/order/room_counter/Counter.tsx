import { setWordInRightWay } from "../../../utils/word";

interface ICounter {
  title: string;
  rooms: number;
  inc: () => void;
  dec: () => void;
}

export default function Counter({ title, rooms, inc, dec }: ICounter) {
  console.log("Counter", title);
  return (
    <div className='flex gap-x-4 items-stretch justify-between text-lg lg:text-2xl font-bold bg-slate-50  '>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          dec();
        }}
      >
        -
      </button>
      <div className='flex gap-x-4 justify-center items-center py-6 w-[300px] tracking-widest'>
        <div>{rooms}</div>
        <div>{setWordInRightWay(title, rooms)}</div>
      </div>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          inc();
        }}
      >
        +
      </button>
    </div>
  );
}
