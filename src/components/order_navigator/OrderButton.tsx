import React from "react";
import { setWordInRightWay } from "../../utils/word";

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
    <div className='basis-full flex items-center justify-between  bg-white font-medium tracking-wider  py-2 rounded-xl'>
      <button
        className='text-4xl rounded-md hover:bg-slate-200 transition duration-300  py-3 lg:py-3 px-5 ml-4'
        onClick={decrease}
      >
        -
      </button>
      <div className='flex gap-x-5 text-lg lg:text-2xl'>
        <p>{state}</p>
        <p>{setWordInRightWay(props.title, state)}</p>
      </div>
      <button
        className='text-4xl rounded-md hover:bg-slate-200 transition duration-300  py-3 px-5 mr-4'
        onClick={increase}
      >
        +
      </button>
    </div>
  );
}
