"use client";

import React, { useState, ChangeEvent, memo, useCallback } from "react";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "~/components/Icons";
import sorts from "~/data/sorts";
import styles from "./Sort.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const Sort = function ({}: Props): React.JSX.Element {
    const [openSortBy, setOpenSortBy] = useState<boolean>(true);

    const handleOpenSortBy = function () {
        setOpenSortBy(!openSortBy);
    };

    const handleChangeSortBy = useCallback(function (event: ChangeEvent<HTMLInputElement>) {}, []);

    return (
        <section className={cx("content__filter")}>
            <header className={cx("content__filter--header")} onClick={handleOpenSortBy}>
                <h3 className={cx("content__filter--title")}>Sort by</h3>
                {!openSortBy ? (
                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                ) : (
                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                )}
            </header>
            {openSortBy && (
                <form className={cx("content__filter--option")}>
                    {sorts.map(function (sort, index: number) {
                        return (
                            <section key={index} className={cx("content__filter--group")}>
                                <h4 className={cx("content__filter--name")}>{sort.displayName}</h4>
                                <input
                                    name={sort.name}
                                    checked={true}
                                    value={sort.value}
                                    className={cx("content__filter--control")}
                                    onChange={handleChangeSortBy}
                                    type={sort.type}
                                />
                            </section>
                        );
                    })}
                </form>
            )}
        </section>
    );
};

export default memo(Sort);
