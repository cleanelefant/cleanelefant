import React, { useRef } from "react";
import InputMask from "react-input-mask";

const Test: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = () => {
    const value = inputRef.current?.value;
    console.log(value); // or do whatever you want with the value
  };
  console.log("Test");
  return (
    <InputMask mask='99-999' onChange={handleInputChange}>
      {() => <input type='text' ref={inputRef} />}
    </InputMask>
  );
};

export default Test;
