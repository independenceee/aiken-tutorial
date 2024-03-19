"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import {
    ArrowDropdownCircleIcon,
    CreatedAtIcon,
    FollowerIcon,
    NftIcon,
    PolicyIdIcon,
    RatingIcon,
    SelledIcon,
    StakekeyIcon,
    FillDashCircleFillIcon,
} from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import CopyItem from "@/components/CopyItem";
import AccountContainer from "@/components/AccountContainer";
import styles from "./Account.module.scss";
import images from "@/assets/images";
import LucidContext from "@/contexts/components/LucidContext";
import DemarketContext from "@/contexts/components/DemarketContext";
import { LucidContextType } from "@/types/LucidContextType";
import { DemarketContextType } from "@/types/DemarketContextType";
import AccountContext from "@/contexts/components/AccountContext";
import { AccountContextType } from "@/types/AccountContextType";
import Search from "@/components/Search";
import Category from "@/components/Category";
import Link from "next/link";
import { AccountItemType, QueryParamsType } from "@/types/GenericsType";
import { post } from "@/utils/http-request";
import convertDatetimePrisma from "@/helpers/convertDatetimePrisma";
import CollectionContainer from "@/components/CollectionContainer";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";

type Props = {
    params: {};
    searchParams: QueryParamsType;
};
const cx = classNames.bind(styles);

const tabItems = [
    { name: "My assets", slug: "my assets" },
    { name: "Selling", slug: "selling" },
    { name: "Created", slug: "created" },
    { name: "Collection", slug: "collection" },
    { name: "Following", slug: "following" },
    { name: "Follower", slug: "follower" },
    { name: "Like", slug: "like" },
];

const AccountPage = function ({ searchParams }: Props) {
    const { id: walletAddressPath }: any = useParams();
    const { sortby, category, verify, search } = searchParams;
    const [verifySearchParam, setVerifySearchParam] = useState<string>(verify || "all");
    const [sortBySearchParam, setSortBySearchParam] = useState<string>(sortby || "all");
    const [categorySearchParam, setCategorySearchParam] = useState<string>(category || "all");
    const [searchValueParam, setSearchValueParam] = useState<string>(search || "");

    const [activeTab, setActiveTab] = useState<string>("my assets");
    const [openIntroduce, setOpenIntroduce] = useState<boolean>(true);
    const handleOpenIntroduct = function () {
        setOpenIntroduce(!openIntroduce);
    };

    const { walletItem } = useContext<LucidContextType>(LucidContext);
    const { accounts, currentPageAccounts, loadingAccounts, setCurrentPageAccounts, totalPagesAccounts } =
        useContext<DemarketContextType>(DemarketContext);

    const {
        assetsFromAddress,
        loadingAssetsFromAddress,
        createdAssetsFromAddress,
        sellingAssetsFromAddress,
        followers,
        currentPageFollowers,
        setCurrentPageFollowers,
        loadingFollowers,
        totalPagesFollowers,
        followings,
        loadingFollowings,
        currentPageFollowings,
        setCurrentPageFollowings,
        totalPagesFollowings,
        collectionsFromAddress,
    } = useContext<AccountContextType>(AccountContext);

    const [accountWalletAddressParams, setAccountWalletAddressParams] = useState<AccountItemType>(null!);

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
                        {walletItem.walletAddress === walletAddressPath ? (
                            <Link href={`/account/${walletItem.walletAddress}/edit`} className={cx("account__button")}>
                                Edit profile
                            </Link>
                        ) : (
                            <Link href={`#`} className={cx("account__button")}>
                                Follow Account
                            </Link>
                        )}
                    </div>

                    <div className={cx("account__content")}>
                        <div className={cx("account__infomation")}>
                            <h3>{accountWalletAddressParams && accountWalletAddressParams.userName}</h3>
                            <p>{accountWalletAddressParams && accountWalletAddressParams.description}</p>
                        </div>
                        <div className={cx("account__media")}>
                            <div className={cx("social__links")}>
                                {accountWalletAddressParams && accountWalletAddressParams.linkedin && (
                                    <Link target="_blank" href={accountWalletAddressParams.twitter}>
                                        <Image src={images.meta} alt="" />
                                    </Link>
                                )}

                                {accountWalletAddressParams && accountWalletAddressParams.twitter && (
                                    <Link target="_blank" href={accountWalletAddressParams.telegram}>
                                        <Image src={images.youtube} alt="" />
                                    </Link>
                                )}
                                {accountWalletAddressParams && accountWalletAddressParams.twitter && (
                                    <Link target="_blank" href={accountWalletAddressParams.twitter}>
                                        <Image src={images.twitter} alt="" />
                                    </Link>
                                )}
                                {accountWalletAddressParams && accountWalletAddressParams.linkedin && (
                                    <Link target="_blank" href={accountWalletAddressParams.linkedin}>
                                        <Image src={images.linkedin} alt="" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className={cx("content__wrapper")}>
                    <aside className={cx("content__left")}>
                        <Search searchValueParam={searchValueParam} setSearchValueParam={setSearchValueParam} />
                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")} onClick={handleOpenIntroduct}>
                                <h3 className={cx("content__filter--title")}>Introduce</h3>
                                {!openIntroduce ? (
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                ) : (
                                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                                )}
                            </header>
                            {openIntroduce && (
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <PolicyIdIcon />
                                            <span>Address:</span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>{walletAddressPath}</p>
                                        <CopyItem value={accountWalletAddressParams && accountWalletAddressParams.walletAddress!} />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <StakekeyIcon />
                                            <span>Stake key: </span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>
                                            {accountWalletAddressParams && accountWalletAddressParams.stakeKey}
                                        </p>
                                        <CopyItem value={accountWalletAddressParams && accountWalletAddressParams.stakeKey!} />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <NftIcon />
                                            <span>NFTs: </span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={assetsFromAddress.length} />
                                        </h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <SelledIcon className={cx("content__filter--icon")} />
                                            <span>NFTs selling:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={sellingAssetsFromAddress.length} />
                                        </h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <FollowerIcon className={cx("content__filter--icon")} />
                                            <span>Followers:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={followers.length} />
                                        </h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <RatingIcon className={cx("content__filter--icon")} />
                                            <span>Rating</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>0</h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <CreatedAtIcon className={cx("content__filter--icon")} />
                                            <span>Joinned</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            {accountWalletAddressParams && convertDatetimePrisma(accountWalletAddressParams.createdAt)}
                                        </h4>
                                    </section>
                                </article>
                            )}
                        </section>

                        <Category categorySearchParam={categorySearchParam} setCategorySearchParam={setCategorySearchParam} />
                    </aside>
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
                            {activeTab === "collection" && (
                                <CollectionContainer collections={collectionsFromAddress} loading={loadingAssetsFromAddress} />
                            )}
                            {activeTab === "following" && (
                                <AccountContainer
                                    accounts={followings}
                                    currentPageAccounts={currentPageFollowings}
                                    totalPagesAccounts={totalPagesFollowings}
                                    loadingAccounts={loadingFollowings}
                                    setCurrentPageAccounts={setCurrentPageFollowings}
                                    isFollow={walletItem.walletAddress === String(walletAddressPath)}
                                />
                            )}
                            {activeTab === "follower" && (
                                <AccountContainer
                                    accounts={followers}
                                    currentPageAccounts={currentPageFollowers}
                                    totalPagesAccounts={totalPagesFollowers}
                                    loadingAccounts={loadingFollowers}
                                    setCurrentPageAccounts={setCurrentPageFollowers}
                                />
                            )}
                            {activeTab === "like" && <NftContainer nfts={assetsFromAddress} loading={loadingAssetsFromAddress} />}
                        </section>
                        <section className={cx("follower__wrapper")}>
                            <header className={cx("follower__header")}>Popular Creators</header>
                            <div className={cx("follower__container")}>
                                <AccountContainer
                                    accounts={accounts}
                                    currentPageAccounts={currentPageAccounts}
                                    totalPagesAccounts={totalPagesAccounts}
                                    loadingAccounts={loadingAccounts}
                                    setCurrentPageAccounts={setCurrentPageAccounts}
                                />
                            </div>
                        </section>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default AccountPage;
