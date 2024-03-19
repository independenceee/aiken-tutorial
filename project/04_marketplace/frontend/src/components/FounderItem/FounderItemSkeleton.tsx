"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./FounderItem.module.scss";
import Skeleton from "react-loading-skeleton";

const cx = classNames.bind(styles);

type Props = {
    index: number;
};

const FounderItemSkeleton = function ({ index }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <Skeleton className={cx("image__wrapper")} width={172} height={172} circle></Skeleton>
            <div className={cx("container")}>
                <Skeleton width={140} height={22} />
                <Skeleton width={140} height={16} />
            </div>
        </div>
    );
};

export default FounderItemSkeleton;
