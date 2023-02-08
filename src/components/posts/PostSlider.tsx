import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { blog } from "../../utils/posts";
import useIntersection from "../../utils/useObserver";
import PostCard from "./PostCard";

const PostsSlider = () => {
  const { bottomRef, topRef, intersection } = useIntersection();

  return (
    <div className='relative'>
      <div className='absolute top-[-120px] h-px' ref={topRef}></div>
      <div className='my-10'>
        <Swiper
          spaceBetween={40}
          slidesPerView={2}
          breakpoints={{
            // when window width is >= 320px
            320: {
              width: 320,
              slidesPerView: 1,
              spaceBetween: 5,
            },
            // when window width is >= 1024px
            1024: {
              width: 1024,
              slidesPerView: 2,
            },
          }}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {blog.map((post) => {
            return (
              <SwiperSlide key={post.id}>
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  double={post.double}
                  intersection={intersection}
                  src={post.src}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
    </div>
  );
};
export default PostsSlider;
