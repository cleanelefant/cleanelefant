import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React from "react";

function HomeOption() {
  const { store } = useContext(Context);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  React.useEffect(() => {
    if (isChecked) {
      store.setHomeRate(1.2);
    } else {
      store.setHomeRate(1);
    }
  }, [isChecked]);

  return (
    <div className='flex items-center'>
      <div>
        <label className='flex items-center cursor-pointer'>
          <div className='relative'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleCheckboxChange}
              className='sr-only'
            />
            <div className='w-8 h-8 bg-white rounded-sm border border-black transition-all duration-200 ease-out absolute left-0'></div>
            {isChecked && (
              <svg
                className='w-7 h-7 text-black fill-current absolute left-0.5 top-0.5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
              </svg>
            )}
          </div>
        </label>
      </div>
      <div className='ml-10 mt-8 text-gray-700 select-none font-extrabold text-lg lg:text-2xl'>
        Dom Prywatny <span>x1.2</span>
      </div>
    </div>
  );
}

export default observer(HomeOption);
