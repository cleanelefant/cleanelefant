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
        itemPropName: "sprzątanie kawalerki",
      },
      {
        id: 2,
        title: "Dwupokojowe",
        price: 179.0,
        room: 2,
        description:
          "Cena obejmuje sprzątanie dwóch pokoi, kuchni, przedpokoju oraz jednej łazienki, raz w tygodniu",
        itemPropName: "sprzątanie dwupokojowego mieszkania",
      },
      {
        id: 3,
        title: "Trzypokojowe",
        price: 209.9,
        room: 3,
        description:
          "Cena obejmuje sprzątanie trzech pokoi, kuchni, przedpokoju oraz jednej łazienki, raz w tygodniu",
        itemPropName: "sprzątanie trzypokojowego mieszkania",
      },
    ];
    setDiscounts(fetchedRates);
    setPrices(fetchedPrices);
  }, []);

  return (
    <div className='pt-10 xl:mx-28'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 justify-center pb-10 text-sm lg:text-lg font-bold '>
        {discounts?.map((d) => (
          <button
            className={`${
              d.isCurent
                ? "bg-blue-500 "
                : "bg-slate-200 lg:bg-slate-100 hover:bg-slate-200"
            } py-2 lg:p-4 rounded-md basis-full transition ease-in-out`}
            key={d.id}
            onClick={() => {
              setActualDiscount(d.id);
            }}
          >
            <div>
              {d.discount !== 0 ? (
                <div className='flex flex-col lg:flex-row items-center justify-center'>
                  <p className=' bg-yellow-600 p-2  rounded-lg font-extrabold inline-block'>
                    -{d.discount}%
                  </p>
                  <p className='p-2'>{d.title}</p>
                </div>
              ) : (
                <p>{d.title}</p>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4 justify-between pb-10 font-bold '>
        {prices?.map((p) => (
          <a
            className='flex justify-center hover:-translate-y-4 transition ease-in-out delay-150'
            key={p.id}
            href={`/order?rooms=${p.room}&bedrooms=1&discount=${actualDiscount.link} `}
            itemType='https://schema.org/Product'
            itemScope
          >
            <meta itemProp='name' content={p.itemPropName}></meta>
            <div
              itemProp='offers'
              itemType='https://schema.org/Offer'
              itemScope
            >
              <link itemProp='url' href='https://cleanwhale.pl/order/3/1' />
              <meta
                itemProp='availability'
                content='https://schema.org/InStock'
              />
              <meta itemProp='priceCurrency' content='PLN' />
              <meta
                itemProp='itemCondition'
                content='https://schema.org/UsedCondition'
              />
              <meta itemProp='price' content={p.price.toString()} />
            </div>
            <div className='block p-6 rounded-lg shadow-lg bg-white max-w-sm'>
              <p className='text-2xl pb-4'>{p.title}</p>
              <p className='text-4xl mb-12'>
                {setActualPrice(p.price, actualDiscount.discount).toFixed(2)}
                <span className='ml-2'>zł.</span>
              </p>
              <div className='text-sm font-thin pb-5 '>{p.description}</div>
              <div className='py-4  bg-blue-600 text-white rounded-lg text-xl'>
                Zamów sprzątanie
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
