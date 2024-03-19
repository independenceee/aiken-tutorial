"use client";
import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./NftItemSlider.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const cx = classNames.bind(styles);
type Props = {
    index: number;
};

const NftItemSkeletonSlider = function ({ index }: Props) {
    return (
        <div className={cx("skeleton")} data-aos="zoom-in-up" data-aos-delay={`${100 * (index + 4)}`} data-aos-duration={`${1000 * (index + 4)}`}>
            <Skeleton width={310} height={200} />
        </div>
    );
};

export default NftItemSkeletonSlider;
