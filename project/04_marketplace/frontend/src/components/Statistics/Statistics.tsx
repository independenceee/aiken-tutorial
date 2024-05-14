"use client";
import React from "react";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";
import { useQuery } from "@tanstack/react-query";
import { get } from "~/utils/http-request";

const cx = classNames.bind(styles);

type Props = {};
const Statistics = function ({}: Props) {
    const { data } = useQuery({
        queryKey: ["Statistics"],
        queryFn: () => get(`/statistics`),
    });

    console.log(data);
    return (
        <div className={cx("wrapper")} data-aos="fade-up">
            <div className={cx("container")}>
                <ul className={cx("statistics")}>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="500">
                        <h2>
                            <CountUp start={0} end={data?.products} duration={2} delay={0} />
                        </h2>
                        <p>PRODUCT</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1000">
                        <h2>
                            <CountUp start={0} end={data?.txHashes} duration={2} delay={0} />
                        </h2>
                        <p>TRANSACTION</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1500">
                        <h2>
                            <CountUp start={0} end={data?.trendings} duration={2} delay={0} />
                        </h2>
                        <p>TRENDING</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="2000">
                        <h2>
                            <CountUp start={0} end={data?.accounts + 100} duration={2} delay={0} />
                        </h2>
                        <p>AUTHOR</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Statistics;
