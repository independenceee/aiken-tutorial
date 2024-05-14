"use client";

import React, { memo, Dispatch, SetStateAction, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Option.module.scss";
const cx = classNames.bind(styles);
type Props = {
    text: string;
    isActive?: boolean;
    redirect: string;
    setSelected?: Dispatch<SetStateAction<string>>;
    className?: string;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
const Option = function ({ text, setOpen, isActive, setSelected, redirect, className }: Props) {
    const router = useRouter();

    const handleClick = useCallback(
        function (content = text) {
            if (setSelected && redirect) {
                setSelected(content);
                router.push(redirect);
            } else {
                return;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [redirect],
    );

    return (
        <Link
            href={redirect}
            className={cx("navbar__link", className)}
            onClick={() => {
                handleClick(text);
                setOpen && setOpen(false);
            }}
        >
            <span className={cx(`${isActive ? "navbar__content--active" : "navbar__content"}`)}>{text}</span>
        </Link>
    );
};

export default memo(Option);
