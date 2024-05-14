import React from "react";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import Link from "next/link";
import { HeaderTableType, TransactionHistoryType } from "~/types/GenericsType";
import { convertTimestampToDateObject, isTransactionHistoryType } from "~/utils/utils";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
    titles: HeaderTableType[];
    data?: TransactionHistoryType[];
    center?: boolean;
};

const Table = function ({ className, data, titles, center = false }: Props) {
    const renderTableBody = function () {
        if (!data) return null;
        if (isTransactionHistoryType(data)) {
            return data.map((item, index) => (
                <tr className={cx("row")} key={index}>
                    <td className={cx("row-item", "date")}>{convertTimestampToDateObject(item.date * 1000)}</td>
                    <td className={cx("row-item", "txhash")}>
                        <Link href={""} target="_blanke">
                            {item.txHash}
                        </Link>
                    </td>
                    <td className={cx("row-item", "action")}>{item.status}</td>
                    <td className={cx("row-item", "amount")}>{+item.price / 1000000} ₳</td>
                    <td className={cx("row-item", "txhash")}>{item.address}</td>
                </tr>
            ));
        }
    };

    return (
        <div className={cx("wrapper", className)}>
            <table className={cx("table", { center })}>
                <thead>
                    <tr className={cx("table-header")}>
                        {titles.map(({ title }, index) => (
                            <td
                                key={index}
                                className={cx("table-header-item", {
                                    center,
                                })}
                            >
                                {title}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody className={cx("rows")}>{renderTableBody()}</tbody>
            </table>
        </div>
    );
};

export default Table;
