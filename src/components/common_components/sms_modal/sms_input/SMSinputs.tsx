import React, { useState, useRef, useEffect, ChangeEvent } from "react";

const SMSCodeInput: React.FC = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;

      if (index < 3 && value !== "") {
        inputRefs.current[index + 1].focus();
      } else if (index === 3 && value !== "") {
        // Send smsCode using fetch and post methods
        const smsCode = newCode.join("");
        console.log("smsCode", smsCode);
        fetch("/api/verify-sms-code", {
          method: "POST",
          body: JSON.stringify({ smsCode }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle response data
            console.log(data);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      }

      return newCode;
    });
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='space-x-2'>
        {code.map((digit, index) => (
          <input
            key={index}
            type='text'
            value={digit}
            maxLength={1}
            className='w-10 h-10 text-center rounded border focus:outline-none focus:ring focus:border-blue-300'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, index)
            }
            ref={(input) =>
              (inputRefs.current[index] = input as HTMLInputElement)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SMSCodeInput;
