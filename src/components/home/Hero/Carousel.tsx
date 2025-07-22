
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const Carousel = ({
  images,
  height,
  delay,
  slideDirection,
}: {
  images: string[];
  height: string;
  delay?: number;
  slideDirection?: 'right' | 'left';
}) => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: delay || 3000,
          disableOnInteraction: false,
          reverseDirection: slideDirection === 'left',
        }}
        loop={true}
        // pagination={{clickable:true}}
        // navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className=""
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              height={400}
              width={1920}
              src={img}
              alt="hero images"
              className={`w-full ${height} object-fill`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
