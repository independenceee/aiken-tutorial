"use client";

import React, { ChangeEvent } from "react";
import { Pagination, Stack } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./AccountContainer.module.scss";
import AccountItem from "@/components/AccountContainer/AccountItem";
import { AccountItemType } from "@/types/GenericsType";
import AccountItemSkeleton from "@/components/AccountContainer/AccountItem/AccountItemSkeleton";

const cx = classNames.bind(styles);

type Props = {
    totalPagesAccounts: number;
    currentPageAccounts: number;
    loadingAccounts: boolean;
    accounts: AccountItemType[];
    setCurrentPageAccounts: React.Dispatch<React.SetStateAction<number>>;
    isFollow?: boolean;
};

const AccountContainer = function ({ currentPageAccounts, accounts, loadingAccounts, totalPagesAccounts, setCurrentPageAccounts, isFollow }: Props) {
    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPageAccounts(page);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {loadingAccounts
                    ? new Array(12).fill(null).map(function (value: any, index: number) {
                          return <AccountItemSkeleton key={index} index={index} />;
                      })
                    : accounts.map(function (account: any, index: number) {
                          return <AccountItem key={index} account={account} index={index} isFollow={isFollow} />;
                      })}
            </div>

            {!loadingAccounts && accounts.length !== 0 ? (
                <Stack spacing={2}>
                    <Pagination count={totalPagesAccounts} page={currentPageAccounts} onChange={handlePageChange} shape="rounded" />
                </Stack>
            ) : null}
        </div>
    );
};

export default AccountContainer;
