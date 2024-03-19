"use client";

import React, { useContext } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import CartContext from "@/contexts/components/CartContext";
import CartItem from "@/components/Cart/CartItem";
import { CartContextType } from "@/types/CartContextType";
import Button from "@/components/Button";
import ModalContext from "@/contexts/components/ModalContext";
import { ModalContextType } from "@/types/ModalContextType";

const cx = classNames.bind(styles);
type Props = {};
const Cart = function ({}: Props) {
    const { toggleShowingCart } = useContext<ModalContextType>(ModalContext);
    const { cartItem, clearCart, completePurchase } = useContext<CartContextType>(CartContext);

    return (
        <main className={cx("wrapper")} data-aos="fade-left" data-aos-duration="500">
            <header className={cx("header")}>
                <section className={cx("header__title")}>
                    <div className={cx("title__left")}>
                        <span>Your cart</span>
                    </div>

                    <div className={cx("title__right")} onClick={toggleShowingCart}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </section>
                {cartItem.totalQuantity > 0 && (
                    <section className={cx("header__description")}>
                        <span>{cartItem.totalQuantity} items</span>
                        <span onClick={clearCart}>Clear all</span>
                    </section>
                )}
            </header>
            {cartItem.totalQuantity > 0 && (
                <div className={cx("container")}>
                    {cartItem.itemsList.map(function (cartItem, index) {
                        return <CartItem key={index} cartItem={cartItem} />;
                    })}
                </div>
            )}
            {cartItem.totalQuantity > 0 && (
                <footer className={cx("total__price")}>
                    <span>Total price</span>
                    <span>{cartItem.totalPrice} ADA</span>
                </footer>
            )}

            {cartItem.totalQuantity === 0 && (
                <div className={cx("noitem__wrapper")}>
                    <span>Add items to get started</span>
                </div>
            )}
            <Button className={cx("button")} onClick={completePurchase}>
                Complete purchase
            </Button>
        </main>
    );
};

export default Cart;
