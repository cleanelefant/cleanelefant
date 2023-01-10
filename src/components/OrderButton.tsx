import React from "react";
import { setWordInRightWay } from "../utils/word";

export default function OrderButton(props: {
  min: number;
  title: string;
  foo: (state: number) => void;
}) {
  const [state, setState] = React.useState(props.min);

  const increase = () => {
    setState((s) => s + 1);
  };
  const decrease = () => {
    setState((s) => {
      if (s > props.min) {
        return s - 1;
      } else {
        return s;
      }
    });
  };

  React.useEffect(() => {
    props.foo(state); // send value to upper level
  }, [state]);

  return (
    <div className='basis-full flex items-center justify-between  bg-white text-2xl font-bold  py-2 rounded-xl'>
      <button
        className='text-3xl rounded-md hover:bg-slate-200 transition duration-300  py-3 lg:py-5 px-5 ml-4'
        onClick={decrease}
      >
        -
      </button>
      <div className='flex gap-x-5 text-lg lg:text-xl'>
        <p>{state}</p>
        <p>{setWordInRightWay(props.title, state)}</p>
      </div>
      <button
        className='text-3xl rounded-md hover:bg-slate-200 transition duration-300  py-3 px-5 mr-4'
        onClick={increase}
      >
        +
      </button>
    </div>
  );
}
