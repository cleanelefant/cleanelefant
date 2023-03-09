import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function ChoosePayment() {
  const { store } = useContext(Context);

  return (
    <div className='sticky top-0 z-50 flex flex-col lg:flex-row bg-gray-300 font-mono'>
      {store.steps?.map((step, i) => (
        <a
          key={step.id}
          className={`${
            step.isActive && "bg-emerald-600"
          } basis-1/4 text-center hover:bg-gray-400 p-px lg:py-4 cursor-pointer border`}
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
