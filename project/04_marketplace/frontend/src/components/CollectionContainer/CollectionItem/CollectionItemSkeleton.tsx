import React from "react";
import classNames from "classnames/bind";
import styles from "./CollectionItem.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const cx = classNames.bind(styles);

type Props = {
    index: number;
};

const CollectionItemSkeleton = function ({ index }: Props) {
    return (
        <div className={cx("wrapper")} data-aos="zoom-in-up" data-aos-delay={`${100 * (index + 4)}`} data-aos-duration={`${1000 * (index + 4)}`}>
            <SkeletonTheme highlightColor="#7000ff" />
            <div className={cx("container")}>
                <header className={cx("header")}>
                    <div className={cx("background__wrapper")}>
                        <Skeleton className={cx("background__image")} />
                    </div>
                    <div className={cx("avatar__wrapper")}>
                        <Skeleton className={cx("avatar__image")} />
                    </div>
                </header>
                <section className={cx("content")}>
                    <div className={cx("content__left")}>
                        <Skeleton width={130} height={20} />
                        <Skeleton width={90} height={15} />
                    </div>
                    <div className={cx("content_right")}>
                        <Skeleton width={80} height={25} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CollectionItemSkeleton;
