"use client";

import React, { useContext } from "react";
import ReactPlayer from "react-player/youtube";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import FounderItem from "@/components/FounderItem";
import { FounderItemType } from "@/types/GenericsType";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import styles from "./About.module.scss";
import FounderItemSkeleton from "@/components/FounderItem/FounderItemSkeleton";
import Button from "@/components/Button";
import founders from "@/data/founders";
import { CheckIcon } from "@/components/Icons";

type Props = {};
const cx = classNames.bind(styles);

const AboutPage = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")} data-aos="fade-down">
                <section className={cx("background__wrapper")}>
                    <div className={cx("background__container")} data-aos="fade-down">
                        <h2 className={cx("background__title")}>About Us</h2>
                        <p className={cx("background__description")}>
                            Blockalpha brings an exciting solution to access the WEB3 platform for everyone, with the ultimate goal of transforming
                            the model from WEB2 to WEB3. We provide technologies to address issues related to transparency, information security, and
                            eliminate third-party interference.
                        </p>
                    </div>
                </section>
                <Title main="HOME" slug="ABOUT" />
                <SubTitle title="About Us" />
                <section className={cx("about")}>
                    <div className={cx("wrapper")}>
                        <div className={cx("wrapper-inner")}>
                            <div className={cx("video-wrapper")} data-aos="fade-right">
                                <iframe
                                    className={cx("video")}
                                    src="https://www.youtube.com/embed/bA_0YiNfma8?si=bVvN7wXIy5D2lVyz"
                                    title="YouTube video player"
                                    frameBorder={0}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen={false}
                                />
                            </div>
                            <div className={cx("content-wrapper")} data-aos="fade-left">
                                <div className={cx("content-body")}>
                                    <div className={cx("content-body-description")}>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo inventore veritatis et tempora incidunt ut labore et dolore magnam aliquam
                                        quaerat voluptatem.
                                    </div>
                                    <div className={cx("content-body-description")}>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo inventore veritatis et tempora incidunt ut labore et dolore magnam aliquam
                                        quaerat voluptatem.
                                    </div>
                                </div>
                                <Button>About Us</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <Statistics />
                <section className={cx("founder__wrapper")}>
                    <SubTitle
                        title="Our Foundation"
                        description="We are impartial and independent, and every day we create distinctive, world-class
                            programmes and develop"
                    />

                    <div id="founder__contact" className={cx("founder__container")}>
                        {founders?.map(function (founder: any, index: number) {
                            return (
                                <FounderItem
                                    index={index}
                                    role={founder.role}
                                    twitter={founder.twitter}
                                    linkedin={founder.linkedin}
                                    lastName={founder.lastName}
                                    firstName={founder.firstName}
                                    company={founder.company}
                                    avatar={founder.avatar}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;
