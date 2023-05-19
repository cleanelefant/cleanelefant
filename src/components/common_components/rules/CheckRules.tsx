import React from "react";

interface ICheckRules {
  isRulesChecked: boolean;
  setIsRulesChecked(value: boolean): void;
  setRulesError(value: boolean): void;
  target: string;
  isError: boolean;
}

function CheckRules({
  isRulesChecked,
  setIsRulesChecked,
  setRulesError,
  target,
  isError,
}: ICheckRules) {
  const handleCheckboxChange = () => {
    if (!isRulesChecked) {
      setIsRulesChecked(!isRulesChecked);
      setRulesError(false);
    } else {
      setIsRulesChecked(!isRulesChecked);
    }
  };

  return (
    <div className='flex items-center' id={target}>
      <div className='mb-4'>
        <label className='flex items-center cursor-pointer'>
          <div className='relative'>
            <input
              type='checkbox'
              checked={isRulesChecked}
              onChange={handleCheckboxChange}
              className='sr-only'
            />
            <div
              className={`w-8 h-8 ${
                isError ? "bg-rose-300" : "bg-white"
              } rounded-sm border border-black transition-all duration-200 ease-out absolute left-0`}
            ></div>
            {isRulesChecked && (
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
      <div
        className={`ml-10 flex justify-center items-center gap-x-3 mt-4 ${
          isError ? "text-red-500" : "text-gray-700"
        } select-none  text-lg lg:text-xl`}
      >
        <p>
          Składając zamówienie zgadzam się z{" "}
          <a className='underline' href='/public-agreement/'>
            Regulaminem
          </a>{" "}
          i{" "}
          <a className='underline' href='/privacy-policy/'>
            Polityką prywatności
          </a>
        </p>
      </div>
    </div>
  );
}

export default CheckRules;
