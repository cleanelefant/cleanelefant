import React from "react";
import start from "../../images/start.webp";

export default function Menu() {
  return (
    <div id='dropdowm-menu_123' className='dropdowm-menu'>
      <div className='flex gap-x-10 justify-between mx-8 py-10 2xl:px-20 font-medium'>
        <div className='flex lg:gap-x-20 2xl:gap-x-40 text-xl'>
          <menu
            itemScope
            itemType='http://www.schema.org/SiteNavigationElement'
            className='flex flex-col gap-y-4'
          >
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                O nas
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Usługi sprzątania
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Co sprzątamy
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Cennik usług
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Abonament
              </a>
            </li>
          </menu>
          <menu
            itemScope
            itemType='http://www.schema.org/SiteNavigationElement'
            className='flex flex-col gap-y-3'
          >
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Opinie
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Program poleceń
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Pytania i odpowiedzi
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test' className='text-red-400 font-bold'>
                Zniżki i promocje
              </a>
            </li>
          </menu>
          <menu
            className='flex flex-col gap-y-3'
            itemScope
            itemType='http://www.schema.org/SiteNavigationElement'
          >
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Nasi partnerzy
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Propozycje dla biznesu
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Zostań cleanerem
              </a>
            </li>
            <li itemProp='name'>
              <a itemProp='url' href='/test'>
                Blog
              </a>
            </li>
          </menu>
        </div>
        {/* Banner start */}
        <a
          href={`/order?rooms=${1}&bedrooms=${1}&option=start`}
          className='bg-gray-300 p-10 rounded-xl flex gap-x-5 items-center'
        >
          <div
            className='w-[150px] h-[150px] rounded-full bg-center bg-cover'
            style={{ backgroundImage: `url(${start})` }}
          ></div>

          <div className='text-xl'>
            <p>Złóż pierwsze zamówienie</p>
            <p className='text-lg mt-2'>Promokod start - zniżka 15%</p>
          </div>
        </a>
        {/* Banner end */}
      </div>
    </div>
  );
}
