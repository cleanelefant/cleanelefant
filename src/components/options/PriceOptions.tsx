import React from "react";
import { rateType, priceType } from "../../types";

function setActualPrice(basePrice: number, actualDiscount: number) {
  const multiplicator = (100 - actualDiscount) / 100;
  return basePrice * multiplicator;
}

export default function PriceOptions() {
  const [discounts, setDiscounts] = React.useState<rateType[]>();
  const [prices, setPrices] = React.useState<priceType[]>();

  const actualDiscount = discounts?.find((d) => d.isCurent === true);

  function setActualDiscount(id: number) {
    setDiscounts(
      [...discounts].map((d) => {
        if (id === d.id) {
          return { ...d, isCurent: true };
        } else {
          return { ...d, isCurent: false };
        }
      })
    );
  }

  React.useEffect(() => {
    const fetchedRates: rateType[] = [
      {
        id: 1,
        title: "Raz w tygodniu",
        discount: 20,
        link: "week",
        isCurent: true,
      },
      {
        id: 2,
        title: "Raz na dwa tygodnie",
        discount: 15,
        link: "twiceperweek",
        isCurent: false,
      },
      {
        id: 3,
        title: "Raz w miesiącu",
        discount: 10,
        link: "month",
        isCurent: false,
      },
      {
        id: 4,
        title: "Jednorazowe sprzątanie",
        discount: 0,
        link: "once",
        isCurent: false,
      },
    ];
    const fetchedPrices = [
      {
        id: 1,
        title: "Jednopokojowe",
        price: 149.9,
        room: 1,
        description:
          "Cena obejmuje sprzątanie jednego pokoju, kuchni, przedpokoju oraz jednej łazienki, raz w tygodniu",
      },
      {
        id: 2,
        title: "Dwupokojowe",
        price: 179.0,
        room: 2,
        description:
          "Cena obejmuje sprzątanie dwóch pokoi, kuchni, przedpokoju oraz jednej łazienki, raz w tygodniu",
      },
      {
        id: 3,
        title: "Trzypokojowe",
        price: 209.9,
        room: 3,
        description:
          "Cena obejmuje sprzątanie trzech pokoi, kuchni, przedpokoju oraz jednej łazienki, raz w tygodniu",
      },
    ];
    setDiscounts(fetchedRates);
    setPrices(fetchedPrices);
  }, []);

  return (
    <div className='py-10 xl:mx-28'>
      <div className='flex gap-x-4 justify-center py-2 font-bold '>
        {discounts?.map((d) => (
          <button
            className={`${
              d.isCurent ? "bg-blue-500" : "bg-slate-300"
            } p-4 rounded-md basis-full`}
            key={d.id}
            onClick={() => {
              setActualDiscount(d.id);
            }}
          >
            <div>
              {d.discount !== 0 ? (
                <p>
                  <span className='mr-4 bg-yellow-600 p-2 rounded-lg font-extrabold'>
                    -{d.discount}%
                  </span>
                  {d.title}
                </p>
              ) : (
                <p>{d.title}</p>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className='flex gap-x-4 justify-center py-8 font-bold '>
        {prices?.map((p) => (
          <a
            className='flex justify-center'
            key={p.id}
            href={`/order?rooms=${p.room}&bedrooms=1&discount=${actualDiscount.link}`}
          >
            <div className='block p-6 rounded-lg shadow-lg bg-white max-w-sm'>
              <p>{p.title}</p>
              <p>
                {setActualPrice(p.price, actualDiscount.discount).toFixed(2)}
                zł.
              </p>
              <div className='text-sm font-thin'>{p.description}</div>
              <div>Zamów sprzątanie</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
