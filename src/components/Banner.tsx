import { randomInt } from "../utils/random"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import './Banner.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Rate } from "antd";

export function Banner(data: any) {

	
	const dataArray = data.data || data; // Assuming data is passed as a prop or directly

	console.log("Data array:", dataArray);
	

	// Getting random indices for the banner
	let i1: number = randomInt(0, dataArray.length - 1);
	let i2: number = randomInt(0, dataArray.length - 1);
	
	if (i1 > i2) {
		[i1, i2] = [i2, i1]; // Ensure i1 is less than or equal to i2
	}

	if (i1 - i2 < 2) {
		i2 = i1 + 2; // Ensure there's a gap of at least 2
	}
	
	const populars: any[] = dataArray.slice(i1, i2 + 1);

return (
    <div className="banner">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
		loop={true}
		autoplay={{ delay: 1000,
			 disableOnInteraction: false,
		}}
		className="mySwiper"
      >
        {populars?.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <div className="banner-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold mt-2">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.overview}</p>
				<div className="mt-2">
				<Rate allowHalf disabled defaultValue={movie.vote_average / 2} />
				<span className="ml-2 text-pink-400 text-sm">
				{movie.vote_average.toFixed(1)} / 10
				</span>
			</div>
			</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}