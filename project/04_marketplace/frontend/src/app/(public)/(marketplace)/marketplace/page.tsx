"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import Background from "~/components/Background";
import Search from "~/components/Filter/Search";
import Sort from "~/components/Filter/Sort";
import Verify from "~/components/Filter/Verify";
import Category from "~/components/Filter/Category";
import Container from "~/components/Product/Container";
import styles from "./Marketplace.module.scss";
import { useQuery } from "@tanstack/react-query";
import { get } from "~/utils/http-request";
const cx = classNames.bind(styles);

type Props = {};

const Marketplace = function ({}: Props) {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Marketplace", page],
        queryFn: () => get(`/marketplaces?page=${page}&pageSize=12`),
    });

    return (
        <div className={cx("wrapper")} data-aos="fade-down">
            <title>Marketplace - Demarket</title>
            <div className={cx("container")}>
                <Background />
                <section className={cx("content")}>
                    <div className={cx("content-left")}>
                        <div className={cx("content-left-inner")} data-aos="fade-right" data-aos-duration="1000">
                            <Search />
                            <Category />
                            <Sort />
                            <Verify />
                        </div>
                    </div>
                    <div className={cx("content-right")} data-aos="fade-left" data-aos-duration="1000">
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                            setPage={setPage}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Marketplace;
