"use client";

import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";
import styles from "./Container.module.scss";
import Item from "../Item";
import Skeleton from "../Skeleton";
import Paginate from "../Pagination";
import { ProductType } from "~/types/GenericsType";

const cx = classNames.bind(styles);
type Props = {
    products?: Array<ProductType | any>;
    page?: number;
    setPage?: Dispatch<SetStateAction<number>>;
    totalPage?: number;
    loading?: boolean;
};

const Container = function ({ products, page, loading, totalPage, setPage }: Props) {
    const handleChangePage = function (event: ChangeEvent<unknown>, value: number) {
        setPage && setPage(value);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {loading &&
                    new Array(12).fill(null).map(function (value: any, index: number) {
                        return <Skeleton key={index} index={index} />;
                    })}
                {!loading &&
                    products?.map(function (product, index: number) {
                        return <Item key={index} product={product} index={index} />;
                    })}
            </div>
            <Paginate onChange={handleChangePage} page={page} loading={loading} totalPage={totalPage} />
        </div>
    );
};
export default Container;
