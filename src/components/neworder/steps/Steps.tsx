import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { steps } from "../../../utils/data/steps";

function Steps() {
  const { store } = useContext(Context);
  React.useEffect(() => {
    store.setSteps(steps);
  }, []);
  const clickHandler = (id: number) => {
    store.setActualStep(id);
  };

  return (
    <div className='sticky top-0 z-40 flex flex-col lg:flex-row lg:gap-x-1 font-mono'>
      {store.steps?.map((step, i) => (
        <a
          key={step.id}
          className={`${
            step.isActive &&
            "text-white bg-gradient-to-l from-green-300 to-cyan-500"
          } basis-1/4 text-center  p-px lg:py-4 cursor-pointer border tracking-wider bg-gray-200 border-b border-white `}
          href={step.target}
          onClick={() => clickHandler(step.id)}
        >
          <p>
            {i + 1}.{step.title}
          </p>
        </a>
      ))}
    </div>
  );
}

export default observer(Steps);
