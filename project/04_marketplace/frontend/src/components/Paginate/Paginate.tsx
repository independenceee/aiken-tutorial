"use client";
import React from "react";
import classNames from "classnames/bind";
import styles from "./Paginate.module.scss";
import Link from "next/link";
const cx = classNames.bind(styles);
type prop = {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
};
function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }: prop) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className={cx("paginate")}>
            {pageNumbers.map((number) => (
                <li key={number} className={cx("pageitem")}>
                    <Link
                        href="#"
                        onClick={() => onPageChange(number)}
                        className={cx("pagelink", { active: currentPage === number })}
                    >
                        {number}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Pagination;
