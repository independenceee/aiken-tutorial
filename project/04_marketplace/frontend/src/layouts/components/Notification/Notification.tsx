"use client";

import React, { ChangeEvent, memo, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Popper from "~/components/Popper/Popper";
import Logo from "~/components/Logo";
import styles from "./Notification.module.scss";
import Link from "next/link";
import WalletContext from "~/contexts/components/WalletContext";
import Button from "~/components/Button";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { BeatLoader } from "react-spinners";
import ModalContext from "~/contexts/components/ModalContext";

const cx = classNames.bind(styles);

type Props = {};

const Notification = function ({}: Props) {
    return (
        <Popper
            placement="top-end"
            onHide={() => {}}
            onShow={() => {}}
            content={
                <main className={cx("notification-wrapper")}>
                    <header className={cx("notification-header")}>
                        <div className={cx("notification-logo-wrapper")}>
                            <Logo />
                        </div>
                    </header>
                </main>
            }
        >
            <button className={cx("notification-button")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={cx("icon-notification")}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                </svg>
                <div className={cx("dot")} />
            </button>
        </Popper>
    );
};

export default memo(Notification);
