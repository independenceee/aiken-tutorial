"use client";

import React, { useState, ChangeEvent, memo, useCallback } from "react";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";
import sortbys from "@/constants/sortbys";
import styles from "./SortBy.module.scss";

const cx = classNames.bind(styles);

type Props = {
    sortBySearchParam: string;
    setSortBySearchParam: React.Dispatch<React.SetStateAction<string>>;
};

const SortBy = function ({ sortBySearchParam, setSortBySearchParam }: Props): React.JSX.Element {
    const [openSortBy, setOpenSortBy] = useState<boolean>(true);

    const handleOpenSortBy = function () {
        setOpenSortBy(!openSortBy);
    };

    const handleChangeSortBy = useCallback(
        function (event: ChangeEvent<HTMLInputElement>) {
            setSortBySearchParam(event.target.value);
        },
        [sortBySearchParam],
    );

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
                    {sortbys.map(function (sortby, index: number) {
                        return (
                            <section key={index} className={cx("content__filter--group")}>
                                <h4 className={cx("content__filter--name")}>{sortby.displayName}</h4>
                                <input
                                    name={sortby.name}
                                    checked={sortby.value === sortBySearchParam}
                                    value={sortby.value}
                                    className={cx("content__filter--control")}
                                    onChange={handleChangeSortBy}
                                    type={sortby.type}
                                />
                            </section>
                        );
                    })}
                </form>
            )}
        </section>
    );
};

export default memo(SortBy);
