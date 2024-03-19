"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./CollectionContainer.module.scss";
import { CollectionItemType } from "@/types/GenericsType";
import { Pagination, Stack } from "@mui/material";
import CollectionItem from "@/components/CollectionContainer/CollectionItem";
import Button from "@/components/Button";
import CountUp from "react-countup";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import CollectionItemSkeleton from "@/components/CollectionContainer/CollectionItem/CollectionItemSkeleton";

const cx = classNames.bind(styles);

type Props = {
    isShowCreate?: boolean;
    collections: Array<CollectionItemType | any>;
    itemsPerPage?: number;
    loading?: boolean;
};
const CollectionContainer = function ({
    collections,
    itemsPerPage = 12,
    loading,
    isShowCreate = true,
}: Props) {
    const { walletItem } = useContext<LucidContextType>(LucidContext);
    const { id: walletAddressParams }: any = useParams();
    const router = useRouter();
    const [currentItems, setCurrentItems] = useState<any>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(collections?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(collections?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, collections]);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        const newOffset = (value - 1) * itemsPerPage;
        setItemOffset(newOffset);
    };
    return (
        <div className={cx("wrapper")}>
            {isShowCreate && (
                <header className={cx("header")}>
                    <h3 className={cx("amount")}>
                        <CountUp start={0} end={collections.length} /> Collection
                    </h3>
                    {walletItem.walletAddress === walletAddressParams && (
                        <Button
                            onClick={() => {
                                router.push("/collection/create");
                            }}
                            className={cx("button")}
                        >
                            Create Collection
                        </Button>
                    )}
                </header>
            )}
            <div className={cx("container")}>
                {loading
                    ? new Array(itemsPerPage).fill(null).map(function (value: any, index: number) {
                          return <CollectionItemSkeleton index={index} key={index} />;
                      })
                    : collections.map(function (collection: CollectionItemType, index: number) {
                          return (
                              <CollectionItem collection={collection} index={index} key={index} />
                          );
                      })}
            </div>
            {!loading && collections.length !== 0 ? (
                <Stack spacing={2}>
                    <Pagination
                        count={pageCount}
                        page={Math.ceil(itemOffset / itemsPerPage) + 1}
                        onChange={handlePageChange}
                        shape="rounded"
                    />
                </Stack>
            ) : null}
        </div>
    );
};

export default CollectionContainer;
