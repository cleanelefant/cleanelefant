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
    <Swiper
      spaceBetween={10}
      slidesPerView={5}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map((s) => (
        <SwiperSlide
          key={s.id}
          className='bg-blue-500 text-white rounded-3xl  flex justify-center items-center'
        >
          <a href={s.slug}>
            <div className='h-10 flex flex-col justify-center items-center my-40'>
              {s.text}
            </div>
          </a>
        </SwiperSlide>
      ))}
      {/* <SwiperSlide className='bg-blue-500 text-white rounded-3xl  flex justify-center items-center'>
        <a href='/test'>
          <div className='h-10 flex flex-col justify-center items-center my-40'>
            Slide 1
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='/test'>
          {" "}
          <div className='bg-red-500 text-white p-20 rounded-3xl'>Slide 1</div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='/test'>
          {" "}
          <div className='bg-red-500 text-white p-20 rounded-3xl'>Slide 1</div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='/test'>
          {" "}
          <div className='bg-red-500 text-white p-20 rounded-3xl text-center'>
            Slide 555
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='/test'>
          {" "}
          <div className='bg-red-500 text-white p-20 rounded-3xl'>Slide 1</div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='/test'>
          {" "}
          <div className='bg-red-500 text-white p-20 rounded-3xl'>Slide 1</div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='/test'>
          {" "}
          <div className='bg-red-500 text-white p-20 rounded-3xl'>Slide 1</div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='/test'>
          {" "}
          <div className='bg-red-500 text-white p-20 rounded-3xl'>Slide 1</div>
        </a>
      </SwiperSlide> */}
    </Swiper>
  );
};
export default Locals;
