"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "~/components/Product/Image";
import classNames from "classnames/bind";
import CountUp from "react-countup";
import styles from "./Item.module.scss";
import convertHexToString from "~/helpers/convert-hex-to-string";
import Copy from "~/components/Copy";
import { ProductType } from "~/types/GenericsType";
import Avatar from "~/components/Avatar";

const cx = classNames.bind(styles);

type Props = {
    product: ProductType;
    index: number;
};

const Item = function ({ product, index }: Props) {
    const router = useRouter();

    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <div
                className={cx("container")}
                onClick={() => router.push(`/detail/${product?.policyId + product?.assetName}`)}
            >
                <Image type={product?.metadata?.mediaType} url={product?.metadata?.image} />
                <section className={cx("content")}>
                    <h3 className={cx("name")}>{convertHexToString(product?.assetName)}</h3>
                    <h3 className={cx("type")}>
                        {product?.metadata?.mediaType ? product?.metadata?.mediaType.split("/").pop() : ""}
                    </h3>
                </section>
                <section className={cx("information")}>
                    <div className={cx("author")}>
                        <Avatar />
                        {product.price && <h3 className={cx("author-name")}>{product.sellerAddress}</h3>}
                        {!product.price && <h3 className={cx("author-name")}>{product.currentAddress}</h3>}
                    </div>
                    {product.price && (
                        <h3 className={cx("price")}>
                            <CountUp start={0} end={Number(product.price) / 1000000 || 0} duration={2} delay={0} /> ₳
                        </h3>
                    )}
                </section>
                <section className={cx("policyId")}>
                    <h4 className={cx("policyId-name")}>PolicyID</h4>
                    <p className={cx("policyId-value")}>
                        <span className={cx("policyId-convert")}>{product.policyId}</span>{" "}
                        <span>{product.policyId.slice(-5)}</span>
                    </p>
                    <Copy value={product.policyId} />
                </section>
            </div>
        </div>
    );
};

export default Item;
