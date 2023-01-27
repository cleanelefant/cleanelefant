// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const slides = [
  {
    id: 1,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
  },
  {
    id: 2,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
  },
  {
    id: 3,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
  },
  {
    id: 4,
    slug: "/test",
    text: "Slide 1",
    src: "https://res.cloudinary.com/zielona-g-ra/image/upload/v1665663053/city_qivavo.webp",
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
        spaceBetween={5}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((s) => (
          <SwiperSlide
            key={s.id}
            className='rounded-3xl  flex justify-center items-center'
          >
            <a href={s.slug}>
              <div
                style={{
                  backgroundImage: `url(${s.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50% 50%",
                }}
                className='h-10 flex flex-col justify-center items-center p-28 py-48 rounded-2xl'
              >
                {s.text}
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Locals;
