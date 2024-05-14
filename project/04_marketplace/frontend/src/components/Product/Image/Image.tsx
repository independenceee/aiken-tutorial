import React from "react";
import checkMediaType from "~/helpers/check-media-type";
import classNames from "classnames/bind";
import styles from "./Image.module.scss";
import convertIpfsAddressToUrl from "~/helpers/convert-ipfs-to-url";

const cx = classNames.bind(styles);

type Props = {
    type: string;
    url: string;
};

const Image = function ({ type, url }: Props) {
    return (
        <section className={cx("wrapper")}>
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
                <audio controls>
                    <source src={String(convertIpfsAddressToUrl(url))} type="audio/mpeg" />
                </audio>
            )}
        </section>
    );
};

export default Image;
