"use client";

import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

type Props = {
    to?: string;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    children?: ReactNode;
    className?: any;
    LeftIcon?: any;
    RightIcon?: any;
    onClick?: () => any;
};

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    LeftIcon,
    RightIcon,
    onClick,
    ...passProps
}: Props) {
    let Component: any = "button";
    const props: any = {
        onClick,
        ...passProps,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = "a";
    }

    const classes: any = cx("wrapper", {
        [className]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        <Component className={classes} {...props}>
            {LeftIcon && (
                <span className={cx("icon")}>
                    <LeftIcon />
                </span>
            )}
            <span className={cx("title")}>{children}</span>
            {RightIcon && (
                <span className={cx("icon")}>
                    <RightIcon />
                </span>
            )}
        </Component>
    );
}

export default Button;
