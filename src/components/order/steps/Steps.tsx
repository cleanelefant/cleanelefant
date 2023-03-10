import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function ChoosePayment() {
  const { store } = useContext(Context);

  return (
    <div className='sticky top-0 z-50 flex flex-col lg:flex-row bg-lime-200 font-mono'>
      {store.steps?.map((step, i) => (
        <a
          key={step.id}
          className={`${
            step.isActive && "text-white bg-lime-600"
          } basis-1/4 text-center hover:bg-lime-300 p-px lg:py-4 cursor-pointer border tracking-wider`}
          href={step.target}
        >
          <p>
            {i + 1}.{step.title}
          </p>
        </a>
      ))}
    </div>
  );
}

export default observer(ChoosePayment);
