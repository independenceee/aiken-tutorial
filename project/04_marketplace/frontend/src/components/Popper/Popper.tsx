"use client";

import classNames from "classnames/bind";
import Tippy, { TippyProps } from "@tippyjs/react/headless";
import styles from "./Popper.module.scss";

const cx = classNames.bind(styles);

const Popper = function ({
    placement = "bottom-end",
    interactive = true,
    trigger = "click",
    content,
    children,
    hideOnClick = true,
    ...restProps
}: TippyProps) {
    return (
        <Tippy
            placement={placement}
            interactive={interactive}
            trigger={trigger}
            hideOnClick={hideOnClick}
            {...restProps}
            render={(attrs) => (
                <div className={cx("popper-wrapper")} tabIndex={-1} {...attrs}>
                    {content}
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default Popper;
