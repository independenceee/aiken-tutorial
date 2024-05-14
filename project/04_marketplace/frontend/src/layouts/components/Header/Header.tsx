"use client";

import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
// import NavbarItem from "@/layouts/components/Header/HeaderOption";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import Hamburger from "~/components/Humburger";
import Logo from "~/components/Logo";
import ConnectWallet from "~/layouts/components/ConnectWallet";
import HeaderUtilities from "../HeaderUtilities/HeaderUtilities";
import Option from "./Option";
import { publicRouters } from "~/routes";
// import Search from "@/layouts/components/Search";
// import { CartContextType } from "@/types/contexts/CartContextType";
// import CartContext from "@/contexts/components/CartContext";
// import Cart from "@/components/Cart";
// import { AccountContextType } from "@/types/contexts/AccountContextType";
// import AccountContext from "@/contexts/components/AccountContext";
// import { publicRouters } from "@/routes";
// import Logo from "@/components/Logo";
// import ConnectWallet from "../ConnectWallet/ConnectWallet";
// import Avatar from "@/components/Avatar";
// import { ModalContextType } from "@/types/contexts/ModalContextType";
// import ModalContext from "@/contexts/components/ModalContext";
// import Modal from "@/components/Modal";
// import Hamburger from "@/components/Hamburger";

const cx = classNames.bind(styles);
type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<React.SetStateAction<string>>;
};

const Header = function ({ selectedRouter, setSelectedRouter }: Props) {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("container")}>
                <Logo />
                <nav className={cx("navbar")}>
                    {publicRouters.map(function (publicRouter, index) {
                        return (
                            <Option
                                key={index}
                                text={publicRouter.name}
                                redirect={publicRouter.redirect}
                                isActive={Boolean(selectedRouter === publicRouter.name)}
                                setSelected={setSelectedRouter}
                            />
                        );
                    })}
                </nav>
                <div className={cx("button__wrapper")}>
                    <HeaderUtilities className={cx("button__other")} />
                    <ConnectWallet className={cx("connect-wallet-button")} />
                    <Hamburger />
                </div>
            </div>
        </header>
    );
};

export default Header;
