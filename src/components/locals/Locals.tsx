import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { slides } from "../../utils/slides";
import useIntersection from "../../utils/useObserver";

const Locals = () => {
  const { bottomRef, topRef, intersection } = useIntersection();
  return (
    <div className='relative'>
       <div className='absolute top-[-120px] h-px' ref={topRef}></div>
    <div className='my-10'>
      <Swiper       
        spaceBetween={40}
        slidesPerView={5}
        breakpoints={{
          // when window width is >= 320px
          320: {
            width: 320,
            slidesPerView: 1,
            spaceBetween:5
          },
          // when window width is >= 1024px
          1024: {
            width: 1024,
            slidesPerView: 3,
          },
        }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((s) => (
          <SwiperSlide
            key={s.id}
            className=' rounded-3xl flex justify-center items-center text-white '
          >
            <a href={s.slug}>
              <div
                style={{
                  backgroundImage: `url(${intersection?s.src:""})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50% 50%",
                }}
                className=' flex flex-col justify-center  rounded-2xl   h-[400px] w-[300px]  lg:h-[500px] lg:w-[340px]'
              >
                <p className="mx-4 text-lg lg:text-2xl font-bold text-center">{s.text}</p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
    </div>  
  );
};
export default Locals;
