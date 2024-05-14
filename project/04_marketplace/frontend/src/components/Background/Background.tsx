"use client";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import classNames from "classnames/bind";
import styles from "./Background.module.scss";
import Link from "next/link";
import sliders from "~/data/sliders";
const cx = classNames.bind(styles);

type Props = {};

const Background = function ({}: Props) {
    const [background, setBackground] = useState<string>(
        "https://ipfs.io/ipfs/QmU8cdX4AWSAiAg5hagnBhyZ3vibM2QYmtJFgCSPCHFHW1",
    );

    return (
        <div style={{ backgroundImage: `url(${background})` }} className={cx("wrapper")}>
            <div className={cx("carousel")} data-aos="fade-left">
                <div>
                    <div className={cx("carousel-content")}>
                        <span>Discover</span>
                        <h1>Make WEB3 Popular with Humans</h1>
                        <hr />
                        <p>
                            DEMARKET is a decentralized NFT exchange on the Cardano Blockchain platform from BLOCKALPHA.
                        </p>
                        <Link href="/marketplace" className={cx("slider-btn")}>
                            Enter NFT Marketplace
                        </Link>
                    </div>
                </div>

                <Swiper
                    data-aos="fade-right"
                    className={cx("myswiper")}
                    modules={[Pagination, EffectCoverflow, Autoplay]}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 3,
                        slideShadows: true,
                    }}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                        1560: { slidesPerView: 3 },
                    }}
                    onSlideChange={(swiper) => {
                        setBackground(sliders[swiper.realIndex].url);
                    }}
                >
                    {sliders.map(function (slider, index: number) {
                        if (slider.url === background) {
                            return (
                                <SwiperSlide
                                    key={index}
                                    style={{ backgroundImage: `url(${slider.url})` }}
                                    className={cx("myswiper-slider-active")}
                                >
                                    <div>
                                        <h2>{slider.title}</h2>
                                        <p>{slider.description}</p>
                                        <Link
                                            href={`/detail/${slider.policyId + slider.assetName}`}
                                            className={cx("slider-btn")}
                                        >
                                            Explore asset
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        }

                        return (
                            <SwiperSlide
                                key={index}
                                style={{ backgroundImage: `url(${slider.url})` }}
                                className={cx("myswiper-slider")}
                            >
                                <div>
                                    <h2>{slider.title}</h2>
                                    <p>{slider.description}</p>
                                    <Link
                                        href={`/detail/${slider.policyId + slider.assetName}`}
                                        className={cx("slider-btn")}
                                    >
                                        explore
                                    </Link>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default Background;
