import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SliderProps {
  data: any;
  SliderCard: React.ComponentType<{ data: any }>;
}

const Slider: React.FC<SliderProps> = ({ data, SliderCard }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swiperEl = document.querySelector('.swiper') as HTMLElement & {
      swiper: any;
    };
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.params.navigation.prevEl = prevRef.current;
      swiperEl.swiper.params.navigation.nextEl = nextRef.current;
      swiperEl.swiper.navigation.init();
      swiperEl.swiper.navigation.update();
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 bg-gray-100 shadow-md rounded-full flex items-center justify-center z-10 cursor-pointer hover:scale-105 transition-all"
      >
        &lt;
      </div>
      <div
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 bg-gray-100 shadow-md rounded-full flex items-center justify-center z-10 cursor-pointer hover:scale-105 transition-all"
      >
        &gt;
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <SliderCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
