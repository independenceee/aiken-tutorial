"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import NftContainer from "@/components/NftContainer";
import { SmartContractType } from "@/types/SmartContextType";
import SubTitle from "@/components/SubTitle";
import SmartContractContext from "@/contexts/components/SmartContractContext";
type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    const { assetsFromSmartContract, loadingAssetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("news__wrapper")}>
                    <SubTitle title={"New Items"} description={"Explore our new products and find your favorites."} />
                    <article className={cx("news_container")}>
                        <NftContainer nfts={assetsFromSmartContract} loading={loadingAssetsFromSmartContract} />
                    </article>
                </section>
            </div>
        </main>
    );
};

export default Home;
