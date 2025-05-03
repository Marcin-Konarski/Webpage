import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import styles from "./EventSlider.module.css";

import slide_image_1 from '../assets/Disenchantment_sunset_profile.jpg';
import slide_image_2 from '../assets/Girl_Profile.jpg';
import slide_image_3 from '../assets/Profile_300x300.jpg';
import slide_image_4 from '../assets/Fluent_Icon_Profile.png';
import slide_image_5 from '../assets/dragon-girl-profile.jpg';
import slide_image_6 from '../assets/m87.jpg';

function EventSlider({ events }) {
    if (!events || events.length === 0) {
        return <div className={styles.container}>No events to display</div>;
    }
    
    return (
        <div className={styles.container}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={3}
                spaceBetween={50}
                coverflowEffect={{
                rotate: 5,
                stretch: 20,
                depth: 100,
                modifier: 2.5,
                }}
                pagination={{ el: `.${styles.swiper_pagination}`, clickable: true }}
                navigation={{
                nextEl: `.${styles.swiper_button_next}`,
                prevEl: `.${styles.swiper_button_prev}`,
                clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className={styles.swiper_container}
            >
                {events.map((event, index) => 
                    <SwiperSlide key={index} className={styles.swiper_slide}>
                    <img src={slide_image_1} alt="slide_image" />
                    <div className={styles.text_overlay}>
                        <h3>{event.eventTitle}</h3>
                        <p>{event.eventDescription}</p>
                    </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default EventSlider;