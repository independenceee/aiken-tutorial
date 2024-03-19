"use client";

import React, { ReactNode, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);
type Props = {
    children: ReactNode;
    isShowing: boolean;
    toggle: () => void;
    transparent?: boolean;
};

const Modal: React.FC<Props> = function ({ isShowing, toggle, children, transparent }: Props) {
    useEffect(() => {
        if (isShowing) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }
        // eslint-disable-next-line
    }, [isShowing]);
    if (isShowing) {
        return (
            <main className={cx("wrapper")}>
                <section className={transparent ? cx("modal-transparent") : cx("modal")} onClick={toggle}></section>
                {children}
            </main>
        );
    }

    return null;
};

export default Modal;
