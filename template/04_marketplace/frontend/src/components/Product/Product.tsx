import classNames from "classnames/bind";
import React from "react";
import styles from "./Product.module.scss";
import Image from "next/image";
import Link from "next/link";

const cx = classNames.bind(styles);
type Props = {};

const Product = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <figure className={cx("banner")}>
                <Image className={cx("banner-image")} src={""} alt="" />
            </figure>
            <div className={cx("content")}>
                <div className={cx("title")}>Name</div>
                <section className={cx("footer")}>
                    <div className={cx("price")}>100 ADA</div>
                    <button className={cx("button")}>BUY</button>
                </section>
            </div>
        </div>
    );
};

export default Product;
