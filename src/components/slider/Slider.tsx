import React from "react";
import MyNote from "./MyNote";
import bg0 from "../../images/bedroom2.webp";
import bg1 from "../../images/2.png";
import bg2 from "../../images/3.png";
import bg3 from "../../images/4.png";

export default function Slider() {
  const [state, setState] = React.useState(0);

  const images = [
    {
      id: 0,
      src: bg0,
      title: "SPRZĄTANIE POKOJU",
    },
    { id: 1, src: bg1, title: "W PRZEDPOKOJU" },
    { id: 2, src: bg2, title: "KUCHNIA" },
    { id: 3, src: bg3, title: "ŁAZIENKA" },
  ];

  const image = images?.find((image) => image.id === state);

  return (
    <div className='pt-10'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 justify-center pb-10 text-sm lg:text-lg font-bold'>
        {images.map((image, index) => {
          return (
            <button
              className={`${
                image.id === state
                  ? "bg-blue-500 "
                  : "bg-slate-200 lg:bg-slate-100 hover:bg-slate-200"
              } py-2 lg:p-4 rounded-md basis-full transition ease-in-out`}
              onClick={() => {
                setState(index);
              }}
            >
              {image.title}
            </button>
          );
        })}
      </div>
      <div className=' lg:max-w-[1333px] h-[700px] m-auto'>
        <div
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500 '
          style={{ backgroundImage: `url(${image.src})` }}
        >
          <div className='mx-auto lg:w-[90%]  xl:w-[80%] h-full relative'>
            <MyNote
              slide={image.id}
              id={0}
              text={"Zbieramy i wyrzucamy śmieci"}
              x={"left-0"}
              y={"top-52"}
              isLeft={true}
            />
            <MyNote
              slide={image.id}
              id={0}
              text={"Starannie rozstawiamy buty i składamy Twoje rzeczy"}
              x={"left-0"}
              y={"top-10"}
              isLeft={true}
            />
            <MyNote
              slide={image.id}
              id={0}
              text={"Odkurzamy i myjemy podłogi"}
              x={"left-60"}
              y={"bottom-10"}
              isLeft={true}
            />
            <MyNote
              slide={image.id}
              id={0}
              text={"Czyścimy lustra"}
              x={"right-2"}
              y={"top-40"}
              isLeft={false}
            />
            <MyNote
              slide={image.id}
              id={0}
              text={"Ścielimy łóżka i zmieniamy pościel"}
              x={"left-20"}
              y={"bottom-60"}
              isLeft={false}
            />
            <MyNote
              slide={image.id}
              id={0}
              text={
                "Myjemy parapety, kaloryfery, listwy, klamki, drzwi, włączniki"
              }
              x={"right-20"}
              y={"bottom-28"}
              isLeft={false}
            />
            <MyNote
              slide={image.id}
              id={0}
              text={"Wycieramy kurz ze wszystkich powierzchni otwartych"}
              x={"right-60"}
              y={"bottom-72"}
              isLeft={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
