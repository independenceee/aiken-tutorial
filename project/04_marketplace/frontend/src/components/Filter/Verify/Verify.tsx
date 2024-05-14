"use client";

import React, { useState, ChangeEvent, memo, useCallback, useEffect } from "react";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "~/components/Icons";
import styles from "./Verify.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const Verify = function ({}: Props): React.JSX.Element {
    const [openVerify, setOpenVerify] = useState<boolean>(true);

    const handleOpenVerify = function () {
        setOpenVerify(!openVerify);
    };

    const handleChangeVerify = useCallback(function (event: ChangeEvent<HTMLInputElement>) {}, []);

    return (
        <section className={cx("content__filter")}>
            <header className={cx("content__filter--header")} onClick={handleOpenVerify}>
                <h3 className={cx("content__filter--title")}>Verify</h3>
                {!openVerify ? (
                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                ) : (
                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                )}
            </header>
            {openVerify && (
                <form className={cx("content__filter--option")}>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>Yes</h4>
                        <input
                            name="verify"
                            value={"true"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeVerify}
                            type="radio"
                        />
                    </section>
                    <section className={cx("content__filter--group")}>
                        <h4 className={cx("content__filter--name")}>No</h4>
                        <input
                            name="verify"
                            value={"false"}
                            className={cx("content__filter--control")}
                            onChange={handleChangeVerify}
                            type="radio"
                        />
                    </section>
                </form>
            )}
        </section>
    );
};

export default memo(Verify);
