import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

type Props = {};

const Header = function ({}: Props) {
    return (
        <header className={cx("wrapper")}>
            <h2 className={cx("title")}>Sell</h2>
        </header>
    );
};

export default Header;
