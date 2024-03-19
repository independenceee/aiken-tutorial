import React from "react";
import classNames from "classnames/bind";
import styles from "./NftItemSlider.module.scss";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import { NftItemType } from "@/types/GenericsType";
import checkMediaType from "@/helpers/checkMediaType";
import convertHexToString from "@/helpers/convertHexToString";
const cx = classNames.bind(styles);

type Props = {
    index: number;
    value: NftItemType;
};
const NftItemSlider = function ({ value, index }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            {checkMediaType(value.mediaType, "image") && (
                <img className={cx("container")} src={String(convertIpfsAddressToUrl(value.image))} alt="" />
            )}
            {checkMediaType(value.mediaType, "video") && (
                <video autoPlay muted loop className={cx("container")}>
                    <source src={String(convertIpfsAddressToUrl(value.image))} type="video/mp4" />
                </video>
            )}

            {checkMediaType(value.mediaType, "application") && (
                <iframe className={cx("container")} src={String(convertIpfsAddressToUrl(value.image))}></iframe>
            )}

            {checkMediaType(value.mediaType, "audio") && (
                <audio className={cx("container")} controls>
                    <source src={String(convertIpfsAddressToUrl(value.image))} type="audio/mpeg" />
                </audio>
            )}
        </div>
    );
};

export default NftItemSlider;
