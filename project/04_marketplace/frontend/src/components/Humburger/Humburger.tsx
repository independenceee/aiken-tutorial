"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Humburger.module.scss";

const cx = classNames.bind(styles);

type Props = {};

function Hamburger({}: Props) {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div
            aria-hidden
            tabIndex={0}
            role="button"
            onClick={() => setActive(!active)}
            className={cx("wrapper")}
        >
            <div className={cx("container")}>
                <div className={cx("humburger", { active: active, inactive: !active })} />
            </div>
        </div>
    );
}

export default Hamburger;
