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
} from "~/components/Icons";
import Container from "~/components/Product/Container";
import Copy from "~/components/Copy";

import styles from "./Account.module.scss";
import images from "~/assets/images";
import LucidContext from "~/contexts/components/LucidContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import Search from "~/components/Filter/Search";
import Category from "~/components/Filter/Category";
import Link from "next/link";
import { get, post } from "~/utils/http-request";
import { useQuery } from "@tanstack/react-query";

type Props = {};
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

const AccountPage = function ({}: Props) {
    const { walletAddress }: any = useParams();

    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Product", page],
        queryFn: () => get(`/products?walletAddress=${walletAddress}&page=${page}&pageSize=12`),
    });

    const { data: account, isLoading: isLoadingAccount } = useQuery({
        queryKey: ["Account", page],
        queryFn: () => get(`/accounts/${walletAddress}`),
    });

    console.log(account);

    const [activeTab, setActiveTab] = useState<string>("my assets");
    const [openIntroduce, setOpenIntroduce] = useState<boolean>(true);
    const handleOpenIntroduct = function () {
        setOpenIntroduce(!openIntroduce);
    };

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("banner__wrapper")}>
                    <Image
                        width={2000}
                        height={2000}
                        className={cx("banner__image")}
                        src={images.banner}
                        alt="Background"
                    />
                </section>

                <section className={cx("account__wrapper")}>
                    <div className={cx("account__container")}>
                        <div className={cx("account__image")}>
                            <Image width={2000} height={2000} src={images.user} alt="User" className={cx("image")} />
                        </div>
                        {/* {walletItem.walletAddress === walletAddressPath ? (
                            <Link href={`/account/${walletItem.walletAddress}/edit`} className={cx("account__button")}>
                                Edit profile
                            </Link>
                        ) : (
                            <Link href={`#`} className={cx("account__button")}>
                                Follow Account
                            </Link>
                        )} */}
                    </div>

                    <div className={cx("account__content")}>
                        <div className={cx("account__infomation")}>
                            <h3>{account?.username ? account?.username : walletAddress}</h3>
                            <p>{account?.description ? account?.description : ""}</p>
                        </div>
                        <div className={cx("account__media")}>
                            <div className={cx("social__links")}>
                                {/* {accountWalletAddressParams && accountWalletAddressParams.linkedin && (
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
                                )} */}
                            </div>
                        </div>
                    </div>
                </section>

                <section className={cx("content__wrapper")}>
                    <aside className={cx("content__left")}>
                        <Search />
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
                                        <p className={cx("content__filter--description")}>{walletAddress}</p>
                                        <Copy value={walletAddress} />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <StakekeyIcon />
                                            <span>Stake key: </span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>{walletAddress}</p>
                                        <Copy value={walletAddress!} />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <NftIcon />
                                            <span>NFTs: </span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={2} />
                                        </h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <SelledIcon className={cx("content__filter--icon")} />
                                            <span>NFTs selling:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={10} />
                                        </h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <FollowerIcon className={cx("content__filter--icon")} />
                                            <span>Followers:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={10} />
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
                                            {/* {accountWalletAddressParams &&
                                                convertDatetimePrisma(accountWalletAddressParams.createdAt)} */}
                                        </h4>
                                    </section>
                                </article>
                            )}
                        </section>

                        <Category />
                    </aside>
                    <article className={cx("content__right")}>
                        <nav className={cx("tab__wrapper")}>
                            <ul className={cx("tab__list")}>
                                {tabItems.map(function (tab, index) {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => setActiveTab(tab.slug)}
                                            className={
                                                activeTab == tab.slug ? cx("tab__item--active") : cx("tab__item")
                                            }
                                        >
                                            {tab.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <section>
                            {activeTab === "my assets" && (
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
                                />
                            )}
                            {activeTab === "selling" && (
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
                                />
                            )}
                            {activeTab === "created" && (
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
                                />
                            )}
                            {activeTab === "collection" && (
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
                                />
                            )}
                            {activeTab === "following" && (
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
                                />
                            )}
                            {activeTab === "follower" && (
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
                                />
                            )}
                            {activeTab === "like" && (
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
                                />
                            )}
                        </section>
                        <section className={cx("follower__wrapper")}>
                            <header className={cx("follower__header")}>Popular Creators</header>
                            <div className={cx("follower__container")}>
                                <Container
                                    products={data?.products}
                                    page={page}
                                    loading={isLoading}
                                    totalPage={data?.totalPage}
                                    setPage={setPage}
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
