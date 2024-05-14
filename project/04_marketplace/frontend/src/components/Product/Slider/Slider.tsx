import React from "react";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import checkMediaType from "~/helpers/check-media-type";
import convertIpfsAddressToUrl from "~/helpers/convert-ipfs-to-url";
const cx = classNames.bind(styles);

type Props = {
    index: number;
    url: string;
    type: string;
};
const Slider = function ({ url, index, type }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            {checkMediaType(type, "image") && (
                <img className={cx("container")} src={String(convertIpfsAddressToUrl(url))} alt="" />
            )}
            {checkMediaType(type, "video") && (
                <video autoPlay muted loop className={cx("container")}>
                    <source src={String(convertIpfsAddressToUrl(url))} type="video/mp4" />
                </video>
            )}

            {checkMediaType(type, "application") && (
                <iframe className={cx("container")} src={String(convertIpfsAddressToUrl(url))}></iframe>
            )}

            {checkMediaType(type, "audio") && (
                <audio className={cx("container")} controls>
                    <source src={String(convertIpfsAddressToUrl(url))} type="audio/mpeg" />
                </audio>
            )}
        </div>
    );
};

export default Slider;
