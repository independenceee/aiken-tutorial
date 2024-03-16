"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Logo from "@/components/Logo";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import Hamburger from "@/components/Hamburger";

const cx = classNames.bind(styles);

const Header = function () {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("container")}>
                <Logo />

                <div className={cx("button__wrapper")}>
                    <ConnectWallet className={cx("connect-wallet-button")} />
                    <Hamburger />
                </div>
            </div>
        </header>
    );
};

export default Header;
