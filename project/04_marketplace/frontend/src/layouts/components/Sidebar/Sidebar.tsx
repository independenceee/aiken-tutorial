import React, { useContext } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.scss";
import { ModalContextType } from "~/types/contexts/ModalContextType";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const Sidebar = function ({ className }: Props) {
    return <div className={cx("button__other", className)}></div>;
};

export default Sidebar;
