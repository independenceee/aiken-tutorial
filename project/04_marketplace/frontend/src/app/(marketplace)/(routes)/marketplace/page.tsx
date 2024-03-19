"use client";

import React, { useContext, useEffect, useState } from "react";

import classNames from "classnames/bind";
import Background from "@/components/Background";
import Title from "@/components/Title";
import NftContainer from "@/components/NftContainer";
import Search from "@/components/Search/Search";
import Category from "@/components/Category";
import Verify from "@/components/Verify";
import SortBy from "@/components/SortBy";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { NftItemType, QueryParamsType } from "@/types/GenericsType";
import { SmartContractType } from "@/types/SmartContextType";
import styles from "./Marketplace.module.scss";
const cx = classNames.bind(styles);
type Props = {
    params: {};
    searchParams: QueryParamsType;
};

const MarketplacePage = function ({ searchParams }: Props) {
    const { sortby, category, verify, search } = searchParams;

    const [verifySearchParam, setVerifySearchParam] = useState<string>("all");
    const [sortBySearchParam, setSortBySearchParam] = useState<string>("all");
    const [categorySearchParam, setCategorySearchParam] = useState<string>("all");
    const [searchValueParam, setSearchValueParam] = useState<string>(search || "");

    const { assetsFromSmartContract, loadingAssetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);

    const [assetsFilter, setAssetsFilter] = useState<NftItemType[]>([]);

    useEffect(() => {
        let assetsFilterTemp: NftItemType[] = [...assetsFromSmartContract];
        if (searchValueParam || search) {
            assetsFilterTemp = assetsFilter.filter(function (asset: NftItemType, index: number) {
                return (
                    asset.policyId
                        .toString()
                        .toLowerCase()
                        .includes(searchValueParam.toLocaleLowerCase() || String(search?.toLocaleLowerCase())) ||
                    asset.assetName
                        .toString()
                        .toLowerCase()
                        .includes(searchValueParam.toLocaleLowerCase() || String(search?.toLocaleLowerCase()))
                );
            });
        }

        setAssetsFilter(assetsFilterTemp);
        // react-hooks/exhaustive-deps
    }, [searchValueParam, search, assetsFromSmartContract]);

    useEffect(() => {
        let assetsFilterTemp: NftItemType[] = [...assetsFromSmartContract];

        if (sortBySearchParam) {
            assetsFilterTemp = assetsFilterTemp.sort(function (previous: NftItemType, next: NftItemType): any {
                switch (sortBySearchParam) {
                    case "all":
                        return Number(next?.createdAt || 0) - Number(previous?.createdAt || 0);
                    case "news":
                        return Number(next?.createdAt || 0) - Number(previous?.createdAt || 0);
                    case "increment":
                        return Number(next?.price || 0) - Number(previous?.price || 0);
                    case "decrement":
                        return Number(previous?.price || 0) - Number(next?.price || 0);
                    case "trending":
                        return Number(next?.createdAt || 0) - Number(previous?.createdAt || 0);
                    default:
                        return 0;
                }
            });
        }

        setAssetsFilter(assetsFilterTemp);
    }, [sortBySearchParam, sortby, assetsFromSmartContract]);

    useEffect(() => {
        let assetsFilterTemp: NftItemType[] = [...assetsFromSmartContract];
        setAssetsFilter(assetsFilterTemp);
    }, [verifySearchParam, assetsFromSmartContract]);

    return (
        <div className={cx("wrapper")} data-aos="fade-down">
            <title>Marketplace - Demarket</title>
            <div className={cx("container")}>
                <Background />
                <Title main="HOME" slug="MARKETPLACE" />
                <section className={cx("content__wrapper")}>
                    <div className={cx("content__left--wrapper")}>
                        <div className={cx("content__left--container")} data-aos="fade-right" data-aos-duration="1000">
                            <Search searchValueParam={searchValueParam} setSearchValueParam={setSearchValueParam} />
                            <Category categorySearchParam={categorySearchParam} setCategorySearchParam={setCategorySearchParam} />
                            <SortBy sortBySearchParam={sortBySearchParam} setSortBySearchParam={setSortBySearchParam} />
                            <Verify verifySearchParam={verifySearchParam} setVerifySearchParam={setVerifySearchParam} />
                        </div>
                    </div>
                    <div className={cx("content__right")} data-aos="fade-left" data-aos-duration="1000">
                        <NftContainer nfts={assetsFilter} itemsPerPage={12} loading={loadingAssetsFromSmartContract} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MarketplacePage;
