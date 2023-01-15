import React from "react";
import bg0 from "../../images/1.png";
import bg1 from "../../images/2.png";
import bg2 from "../../images/3.png";
import bg3 from "../../images/4.png";

export default function Slider() {
  const [state, setState] = React.useState(0);

  const images = [
    { src: bg0, title: "SPRZĄTANIE POKOJU" },
    { src: bg1, title: "W PRZEDPOKOJU" },
    { src: bg2, title: "KUCHNIA" },
    { src: bg3, title: "ŁAZIENKA" },
  ];

  return (
    <div>
      <div className="flex gap-x-5 justify-center items-center">
        {images.map((image, index) => {
          return (
            <button className="inline-block px-6 py-2.5 bg-white hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => {
                setState(index);
              }}
            >
              {image.title}
            </button>
          );
        })}
      </div>
      <div className="max-w-[1000px] h-[580px] w-full m-auto relative group">
        <div
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          style={{ backgroundImage: `url(${images[state].src})` }}
        ></div>
      </div>
    </div>
  );
}
