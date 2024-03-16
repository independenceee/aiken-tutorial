"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import NftContainer from "@/components/NftContainer";
import styles from "./Account.module.scss";
import images from "@/assets/images";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";
import AccountContext from "@/contexts/components/AccountContext";
import { AccountContextType } from "@/types/AccountContextType";
import Link from "next/link";
import { AccountItemType } from "@/types/GenericsType";
import { post } from "@/utils/http-request";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";

const cx = classNames.bind(styles);

const tabItems = [
    { name: "My assets", slug: "my assets" },
    { name: "Selling", slug: "selling" },
    { name: "Created", slug: "created" },
    { name: "Like", slug: "like" },
];

const AccountPage = function () {
    const { id: walletAddressPath }: any = useParams();
    const [activeTab, setActiveTab] = useState<string>("my assets");

    const { assetsFromAddress, loadingAssetsFromAddress, createdAssetsFromAddress, sellingAssetsFromAddress } =
        useContext<AccountContextType>(AccountContext);
    const [accountWalletAddressParams, setAccountWalletAddressParams] = useState<AccountItemType>(null!);

    const { walletAddress } = useContext<LucidContextType>(LucidContext);
    useEffect(
        function () {
            const fetchAccountFromAddress = async function () {
                try {
                    const account: AccountItemType = await post("/account", {
                        walletAddress: walletAddressPath,
                    });
                    setAccountWalletAddressParams(account);
                } catch (error) {
                    console.log(error);
                }
            };
            if (walletAddressPath) {
                fetchAccountFromAddress();
            }
        },
        [walletAddressPath],
    );

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("banner__wrapper")}>
                    <Image
                        width={2000}
                        height={2000}
                        className={cx("banner__image")}
                        src={accountWalletAddressParams?.cover ? convertIpfsAddressToUrl(accountWalletAddressParams?.cover) : images.background}
                        alt="Background"
                    />
                </section>

                <section className={cx("account__wrapper")}>
                    <div className={cx("account__container")}>
                        <div className={cx("account__image")}>
                            <Image
                                width={2000}
                                height={2000}
                                src={accountWalletAddressParams?.avatar ? convertIpfsAddressToUrl(accountWalletAddressParams?.avatar) : images.user}
                                alt="User"
                                className={cx("image")}
                            />
                        </div>
                        {walletAddress === walletAddressPath ? (
                            <Link href={`/account/${walletAddress}/edit`} className={cx("account__button")}>
                                Edit profile
                            </Link>
                        ) : (
                            <Link href={`#`} className={cx("account__button")}>
                                Follow Account
                            </Link>
                        )}
                    </div>
                </section>

                <section className={cx("content__wrapper")}>
                    <article className={cx("content__right")}>
                        <nav className={cx("tab__wrapper")}>
                            <ul className={cx("tab__list")}>
                                {tabItems.map(function (tab, index) {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => setActiveTab(tab.slug)}
                                            className={activeTab == tab.slug ? cx("tab__item--active") : cx("tab__item")}
                                        >
                                            {tab.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <section>
                            {activeTab === "my assets" && <NftContainer nfts={assetsFromAddress} loading={loadingAssetsFromAddress} />}
                            {activeTab === "selling" && <NftContainer nfts={sellingAssetsFromAddress} loading={loadingAssetsFromAddress} />}
                            {activeTab === "created" && <NftContainer nfts={createdAssetsFromAddress} loading={loadingAssetsFromAddress} />}
                            {activeTab === "like" && <NftContainer nfts={assetsFromAddress} loading={loadingAssetsFromAddress} />}
                        </section>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default AccountPage;
