"use client";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";
import { get } from "@/utils/http-request";
import { Statistic } from "@/types/GenericsType";
import { contractAddressMarketplace } from "@/libs/marketplace";
const cx = classNames.bind(styles);

type Props = {};
const Statistics = function ({}: Props) {
    const [statistics, setStatistics] = useState<Statistic>({
        totalAccount: 0,
        totalProduct: 0,
        totalTransaction: 0,
        totalTrending: 0,
    });

    useEffect(function () {
        const fetchStatistics = async function () {
            try {
                const { totalAccounts } = await get("/statistics/account");
                const { totalTrendings } = await get("/statistics/trending");
                const { totalTransactions } = await get(
                    `/statistics/transaction?contractAddress=${contractAddressMarketplace}`,
                );
                const { totalProducts } = await get(
                    `/statistics/product?contractAddress=${contractAddressMarketplace}`,
                );
                setStatistics({
                    totalAccount: totalAccounts,
                    totalProduct: totalProducts,
                    totalTransaction: totalTransactions,
                    totalTrending: totalTrendings,
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchStatistics();
    }, []);

    return (
        <div className={cx("wrapper")} data-aos="fade-up">
            <div className={cx("container")}>
                <ul className={cx("statistics")}>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="500">
                        <h2>
                            <CountUp
                                start={0}
                                end={statistics.totalProduct}
                                duration={2}
                                delay={0}
                            />
                        </h2>
                        <p>PRODUCT</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1000">
                        <h2>
                            <CountUp
                                start={0}
                                end={statistics.totalTransaction}
                                duration={2}
                                delay={0}
                            />
                        </h2>
                        <p>TRANSACTION</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1500">
                        <h2>
                            <CountUp
                                start={0}
                                end={statistics.totalTrending}
                                duration={2}
                                delay={0}
                            />
                        </h2>
                        <p>TRENDING</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="2000">
                        <h2>
                            <CountUp
                                start={0}
                                end={statistics.totalAccount}
                                duration={2}
                                delay={0}
                            />
                        </h2>
                        <p>AUTHOR</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Statistics;
