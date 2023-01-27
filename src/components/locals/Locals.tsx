// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const slides = [
  {
    id: 1,
    slug: "/test",
    text: "Order cleaning in Downtown L.A.",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1674822937/clean/downtown_tb0l9a.png",
  },
  {
    id: 2,
    slug: "/test",
    text: "Order cleaning in Hollywood L.A.",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1674823301/clean/hollywood_amjqkt.png",
  },
  {
    id: 3,
    slug: "/test",
    text: "Order cleaning in West Hollywood L.A.",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1674826290/clean/westhoolywood_ndlrj9.png",
  },
  {
    id: 4,
    slug: "/test",
    text: "Order cleaning in West Santa Monica",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1674826592/clean/santa_monica_s6ylhx.png",
  },
  {
    id: 5,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
  },
  {
    id: 6,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
  },
  {
    id: 7,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
  },
  {
    id: 8,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
  },
];

const Locals = () => {
  return (
    <div className='my-10'>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((s) => (
          <SwiperSlide
            key={s.id}
            className=' rounded-3xl flex justify-center items-center text-white '
          >
            <a href={s.slug}>
              <div
                style={{
                  backgroundImage: `url(${s.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50% 50%",
                }}
                className=' flex flex-col justify-center items-center  rounded-2xl text-2xl font-bold h-[600px] w-[340px]'
              >
                <p>{s.text}</p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Locals;
