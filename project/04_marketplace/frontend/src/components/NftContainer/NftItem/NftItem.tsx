"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import CountUp from "react-countup";
import styles from "./NftItem.module.scss";
import images from "@/assets/images";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import checkMediaType from "@/helpers/checkMediaType";
import convertHexToString from "@/helpers/convertHexToString";
import CopyItem from "@/components/CopyItem";

const cx = classNames.bind(styles);

type Props = {
    value: any;
    index: number;
};

const NftItem = function ({ value }: Props) {
    const router = useRouter();

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")} onClick={() => router.push(`/detail/${value.policyId + value.assetName}`)}>
                <section className={cx("image__wrapper")}>
                    {checkMediaType(value.mediaType, "image") && (
                        <img className={cx("image")} src={String(convertIpfsAddressToUrl(value.image))} alt="" />
                    )}
                    {checkMediaType(value.mediaType, "video") && (
                        <video autoPlay muted loop className={cx("image")}>
                            <source src={String(convertIpfsAddressToUrl(value.image))} type="video/mp4" />
                        </video>
                    )}

                    {checkMediaType(value.mediaType, "application") && (
                        <iframe className={cx("image")} src={String(convertIpfsAddressToUrl(value.image))}></iframe>
                    )}

                    {checkMediaType(value.mediaType, "audio") && (
                        <audio controls>
                            <source src={String(convertIpfsAddressToUrl(value.image))} type="audio/mpeg" />
                        </audio>
                    )}
                </section>
                <section className={cx("content")}>
                    <h3 className={cx("content__title")}>{convertHexToString(value.assetName) || images.background}</h3>
                    <h3 className={cx("content__title")}>{value.mediaType ? value.mediaType.split("/").pop() : ""}</h3>
                </section>
                <section className={cx("information")}>
                    <div className={cx("author")}>
                        {!value.price && <Image width={2000} height={2000} className={cx("avatar")} src={images.user} alt="" />}
                        {value.price && (
                            <Image
                                width={2000}
                                height={2000}
                                className={cx("avatar")}
                                src={value.sellerAccount.avatar !== null ? convertIpfsAddressToUrl(value.sellerAccount.avatar) : images.user}
                                alt=""
                            />
                        )}
                        {value.price && <h3 className={cx("name")}>{value?.sellerAccount?.userName}</h3>}
                        {!value.price && <h3 className={cx("name")}>{value.currentAddress}</h3>}
                    </div>
                    {value.price && (
                        <h3 className={cx("price")}>
                            <CountUp start={0} end={Number(value.price) / 1000000 || 0} duration={2} delay={0} /> ₳
                        </h3>
                    )}
                </section>
                <section className={cx("policyId")}>
                    <h4 className={cx("policyId__name")}>PolicyID</h4>
                    <p className={cx("policyId__value")}>
                        <span className={cx("policyId__convert")}>{value.policyId}</span> <span>{value.policyId.slice(-5)}</span>
                    </p>
                    <CopyItem value={value.policyId} />
                </section>
            </div>
        </div>
    );
};

export default NftItem;
