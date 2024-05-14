"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import Background from "~/components/Background";
import styles from "./Home.module.scss";
import Title from "~/components/Title";
import Container from "~/components/Product/Container";
import { get } from "~/utils/http-request";
import { useQuery } from "@tanstack/react-query";


const cx = classNames.bind(styles);

type Props = {};

const Home = function ({}: Props) {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Marketplace", page],
        queryFn: () => get(`/marketplaces?page=${page}&pageSize=12`),
    });


    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />

                <section className={cx("content")}>
                    <Title title={"New Items"} description={"Explore our new products and find your favorites."} />
                    <article className={cx("inner")}>
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                            setPage={setPage}
                        />
                    </article>
                </section>
            </div>
        </main>
    );
};

export default Home;
