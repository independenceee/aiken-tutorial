import React from "react";
import classNames from "classnames/bind";
import styles from "./CollectionItem.module.scss";
import { CollectionItemType } from "@/types/GenericsType";
import { useParams, useRouter } from "next/navigation";
import images from "@/assets/images";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";

const cx = classNames.bind(styles);

type Props = {
    collection: CollectionItemType;
    index: number;
};

const CollectionItem = function ({ collection, index }: Props) {
    const router = useRouter();
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
            onClick={() =>
                router.push(`/collection/${collection.policyId}?address=${collection.address}`)
            }
        >
            <div className={cx("container")}>
                <header className={cx("header")}>
                    <div className={cx("background__wrapper")}>
                        <img
                            className={cx("background__image")}
                            src={convertIpfsAddressToUrl(collection.cover) || images.noImage}
                            alt="Backgound Image"
                        />
                    </div>
                    <div className={cx("avatar__wrapper")}>
                        <img
                            className={cx("avatar__image")}
                            src={convertIpfsAddressToUrl(collection.avatar) || images.user}
                            alt="User Image"
                        />
                    </div>
                </header>
                <section className={cx("content")}>
                    <div className={cx("content__left")}>
                        <h3 className={cx("content__left--name")}>{collection.title}</h3>
                        <p className={cx("content__left--amount")}>{""}</p>
                    </div>
                    <div className={cx("content_right")}></div>
                </section>
            </div>
        </div>
    );
};

export default CollectionItem;
