"use client";
import React from "react";
import classNames from "classnames/bind";
import styles from "./NftItem.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const cx = classNames.bind(styles);
type Props = {
    index: number;
};

const NftItemSkeleton = function ({ index }: Props) {
    return (
        <div className={cx("wrapper")} data-aos="zoom-in-up" data-aos-delay={`${100 * (index + 4)}`} data-aos-duration={`${1000 * (index + 4)}`}>
            <SkeletonTheme highlightColor="#7000ff" />
            <div className={cx("container")}>
                <Skeleton width={"100%"} height={200} borderRadius={8} />
                <section className={cx("content")}>
                    <Skeleton width={40} />
                    <Skeleton width={40} />
                </section>

                <section className={cx("information")}>
                    <div className={cx("author")}>
                        <Skeleton width={26} height={26} circle />
                        <h3 style={{ marginLeft: 4 }} className={cx("name")}>
                            <Skeleton width={50} height={16} />
                        </h3>
                    </div>

                    <h3 className={cx("price")}>
                        <Skeleton width={50} height={16} />
                    </h3>
                </section>
                <Skeleton width={"100%"} height={30} />
            </div>
        </div>
    );
};

export default NftItemSkeleton;
