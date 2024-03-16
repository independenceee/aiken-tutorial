"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./NftContainer.module.scss";
import NftItem from "./NftItem";
import NftItemSkeleton from "./NftItem/NftItemSkeleton";
import { Pagination, Stack } from "@mui/material";
import { NftItemType } from "@/types/GenericsType";

const cx = classNames.bind(styles);
type Props = {
    nfts: Array<NftItemType | any>;
    itemsPerPage?: number;
    loading?: boolean;
};

const NftContainer = function ({ nfts, itemsPerPage = 12, loading }: Props) {
    const [currentItems, setCurrentItems] = useState<any>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(nfts?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(nfts?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, nfts]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        const newOffset = (value - 1) * itemsPerPage;
        setItemOffset(newOffset);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {loading
                    ? new Array(itemsPerPage).fill(null).map(function (value: any, index: number) {
                          return <NftItemSkeleton key={index} />;
                      })
                    : currentItems?.map(function (value: ChangeEvent<unknown>, index: number) {
                          return <NftItem key={index} value={value} index={index} />;
                      })}
            </div>
            {!loading && nfts.length !== 0 ? (
                <Stack spacing={2}>
                    <Pagination count={pageCount} shape="rounded" page={Math.ceil(itemOffset / itemsPerPage) + 1} onChange={handlePageChange} />
                </Stack>
            ) : null}
        </div>
    );
};
export default NftContainer;
