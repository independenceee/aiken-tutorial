import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import classNames from "classnames/bind";
import styles from "./AccountItemSilder.module.scss";
const cx = classNames.bind(styles);

type Props = {
    index: number;
};
const AccountItemSliderSkeleton = function ({ index }: Props) {
    return (
        <div data-aos="zoom-in-up" data-aos-delay={`${100 * (index + 4)}`} data-aos-duration={`${1000 * (index + 4)}`} className={cx("wrapper")}>
            <section className={cx("avatar__wrapper")}>
                <div className={cx("avatar__container")}>
                    <Skeleton width={"100%"} height={"100%"} borderRadius={"50%"} />
                </div>
            </section>
            <section className={cx("content__wrapper")}>
                <div className={cx("content__main")}>
                    <Skeleton width={140} height={20} />
                </div>
                <div className={cx("content__information")}>
                    <Skeleton width={80} height={15} />
                </div>
            </section>
        </div>
    );
};

export default AccountItemSliderSkeleton;
