import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Expand.module.scss";
import { TransactionHistoryType } from "~/types/GenericsType";
import Link from "next/link";
import { convertTimestampToDateObject } from "~/utils/utils";

type Props = {
    className?: string;
    data: TransactionHistoryType;
};

const cx = classNames.bind(styles);

const Expand = function ({ className, data }: Props) {
    const [toggle, setToggle] = useState<boolean>(false);

    const handleActiveAccordion = () => {
        setToggle((prev) => !prev);
    };

    return (
        <div className={cx("wrapper")} onClick={handleActiveAccordion}>
            <div>
                <header className={cx("header", className)}>
                    <span className={cx("action-type")}>{data.status}</span>
                    {+data.price / 1000000} ₳
                    <div
                        className={cx("icon", {
                            active: toggle,
                        })}
                    />
                </header>
                <div
                    className={cx("expanded-content", {
                        active: toggle,
                    })}
                >
                    <div className={cx("left-content")}>
                        <div className={cx("date")}>
                            <div className={cx("title-wrapper")}>
                                <span className={cx("title")}>Date</span>
                            </div>
                            <div className={cx("value")}>{convertTimestampToDateObject(data.date)}</div>
                        </div>
                        <div className={cx("tx-hash")}>
                            <div className={cx("title-wrapper")}>
                                <span className={cx("title")}>Tx hash</span>
                            </div>
                            <div className={cx("value")}>
                                <Link
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href={`https://preprod.cardanoscan.io/transaction/${data.txHash}`}
                                    className={cx("link")}
                                >
                                    {data.txHash}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx("right-content")}>
                        <div className={cx("received-or-payed")}>
                            <div className={cx("title-wrapper")}>
                                <span className={cx("title")}>Price</span>
                            </div>
                            <div className={cx("value")}>{+data.price / 1000000} ₳</div>
                        </div>
                        <div className={cx("status")}>
                            <div className={"title-wrapper"}>
                                <span className={cx("title")}>Action</span>
                            </div>
                            <div className={cx("value")}>{data.status}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expand;
