"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";
import { TrashIcon } from "@/components/Icons";
import convertHexToString from "@/helpers/convertHexToString";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import covertString from "@/helpers/convertString";
import CartContext from "@/contexts/components/CartContext";
import { CartContextType } from "@/types/CartContextType";
import checkMediaType from "@/helpers/checkMediaType";
import { NftItemType } from "@/types/GenericsType";
import images from "@/assets/images";
import Image from "next/image";

const cx = classNames.bind(styles);

type Props = {
    cartItem: NftItemType;
};

const CartItem = function ({ cartItem }: Props) {
    const router = useRouter();
    const { removeFromCart } = useContext<CartContextType>(CartContext);

    const handleRemoveFromCart = async function () {
        await removeFromCart({ policyId: cartItem.policyId, assetName: cartItem.assetName, id: cartItem.id });
    };
    return (
        <div className={cx("wrapper")} onClick={() => router.push(`/detail/${cartItem.policyId + cartItem.assetName}`)}>
            <div className={cx("inner")}>
                <div className={cx("image__wrapper")}>
                    {checkMediaType(cartItem.mediaType, "image") && (
                        <img className={cx("image")} src={String(convertIpfsAddressToUrl(cartItem.image))} alt="" />
                    )}
                    {checkMediaType(cartItem.mediaType, "video") && (
                        <video autoPlay muted loop className={cx("image")}>
                            <source src={String(convertIpfsAddressToUrl(cartItem.image))} type="video/mp4" />
                        </video>
                    )}

                    {checkMediaType(cartItem.mediaType, "application") && (
                        <iframe className={cx("image")} src={String(convertIpfsAddressToUrl(cartItem.image))}></iframe>
                    )}

                    {checkMediaType(cartItem.mediaType, "audio") && (
                        <Image className={cx("audio")} src={images.mp3} alt="" />
                    )}
                </div>
                <div className={cx("information__wrapper")}>
                    <div className={cx("name")}>{String(convertHexToString(cartItem.assetName))}</div>
                    <div className={cx("policyId")}>{String(covertString({ inputString: cartItem.policyId }))}</div>
                    <div className={cx("policyId")}>Selling</div>
                </div>
            </div>
            <div className={cx("price")}>{Number(cartItem.price) / 1000000} ADA</div>
            <div className={cx("trash")} onClick={handleRemoveFromCart}>
                <TrashIcon />
            </div>
        </div>
    );
};

export default CartItem;
