import React from "react";
import bg0 from "../../images/bedroom .webp";
import bg1 from "../../images/2.png";
import bg2 from "../../images/3.png";
import bg3 from "../../images/4.png";

export default function Slider() {
  const [state, setState] = React.useState(0);

  const images = [
    {
      id: 0,
      src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1673858121/clean/bedroom_wczmwd.webp",
      title: "SPRZĄTANIE POKOJU",
    },
    { id: 1, src: bg1, title: "W PRZEDPOKOJU" },
    { id: 2, src: bg2, title: "KUCHNIA" },
    { id: 3, src: bg3, title: "ŁAZIENKA" },
  ];

  const image = images?.find((image) => image.id === state);

  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-x-0 lg:gap-x-5 justify-center items-center'>
        {images.map((image, index) => {
          return (
            <button
              className='inline-block px-6 py-2.5 bg-white hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
              onClick={() => {
                setState(index);
              }}
            >
              {image.title}
            </button>
          );
        })}
      </div>
      <div className='max-w-[100vw] lg:max-w-[74vw]  h-[800px] w-full m-auto'>
        <div
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500 '
          style={{ backgroundImage: `url(${image.src})` }}
        ></div>
      </div>
    </div>
  );
}
