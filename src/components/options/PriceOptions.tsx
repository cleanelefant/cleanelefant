import React from "react";
import { basePricesType, ratesType } from "../../types";

export default function PriceOptions() {
  const [state, setState] = React.useState<basePricesType>(
    {} as basePricesType
  );
  const [rates, setRates] = React.useState<ratesType>({} as ratesType);

  const ratesKeys: string[] = Object.keys(rates);

  const ref = React.useRef({} as basePricesType);
  function setPrices(rate: number) {
    const num = (100 - rate) / 100;
    const currentPrices: basePricesType = {
      one: ref.current.one * num,
      two: ref.current.two * num,
      three: ref.current.three * num,
    };
    setState(currentPrices);
  }

  React.useEffect(() => {
    const basePrices = { one: 150, two: 180, three: 210 };
    const fetchedRates = { first: 20, second: 15, third: 10 };
    ref.current = basePrices;
    setState(basePrices);
    setRates({
      first: fetchedRates.first,
      second: fetchedRates.second,
      thrird: fetchedRates.third,
    });
  }, []);

  return (
    <div className=''>
      <div className='flex gap-x-5'>
        <button
          onClick={() => {
            setPrices(rates.first);
          }}
        >
          <p>
            <span>-{rates.first}%</span>Raz w tygodniu
          </p>
        </button>
        <button
          onClick={() => {
            setPrices(rates.second);
          }}
        >
          <p>
            <span>-{rates.second}%</span>Raz na dwa tygodnie
          </p>
        </button>
        <button
          onClick={() => {
            setPrices(rates.thrird);
          }}
        >
          <p>
            <span>-{rates.second}%</span>Raz w miesiącu
          </p>
        </button>
        <button
          onClick={() => {
            setPrices(0);
          }}
        >
          <p>Jednorazowe sprzątanie</p>
        </button>
      </div>
      <div className='flex gap-x-5'>
        <a href={`/order?rooms=1&bedrooms=1&type=${ratesKeys[0]}`}>
          <p>Jednopokojowe</p>
          <p>{state.one} zł</p>
        </a>
        <a href={`/order?rooms=2&bedrooms=1&type=${ratesKeys[1]}`}>
          <p>Dwupokojowe</p>
          <p>{state.two} zł</p>
        </a>
        <a href={`/order?rooms=3&bedrooms=1&type=${ratesKeys[2]}`}>
          <p>Trzypokojowe</p>
          <p>{state.three} zł</p>
        </a>
      </div>
    </div>
  );
}
