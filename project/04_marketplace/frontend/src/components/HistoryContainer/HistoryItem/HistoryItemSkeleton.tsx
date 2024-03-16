import React from "react";
import classNames from "classnames/bind";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "./HistoryItem.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const HistoryItemSkeleton = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <SkeletonTheme highlightColor="#7000ff" />
            <div className={cx("container")}>
                <Skeleton width={70} height={70} borderRadius={"50%"} />
                <section className={cx("infomation__wrapper")}>
                    <Skeleton width={500} height={17} />
                    <Skeleton width={120} height={17} />
                </section>
            </div>
        </div>
    );
};

export default HistoryItemSkeleton;
