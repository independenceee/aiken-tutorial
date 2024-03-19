"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import styles from "./Home.module.scss";
import NftContainer from "@/components/NftContainer";
import { SmartContractType } from "@/types/SmartContextType";
import Background from "@/components/Background";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import AccountItemSilder from "@/components/AccountContainer/AccountItemSilder";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import DemarketContext from "@/contexts/components/DemarketContext";
import NftItemSlider from "@/components/NftContainer/NftItemSlider/NftItemSlider";
import { DemarketContextType } from "@/types/DemarketContextType";
import NftItemSliderSkeleton from "@/components/NftContainer/NftItemSlider/NftItemSliderSkeleton";
import AccountItemSliderSkeleton from "@/components/AccountContainer/AccountItemSilder/AccountItemSliderSkeleton";
import { AccountItemType } from "@/types/GenericsType";
import Donate from "@/components/Donate";
type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    const { assetsFromSmartContract, loadingAssetsFromSmartContract } =
        useContext<SmartContractType>(SmartContractContext);

    const { accounts, loadingAccounts } = useContext<DemarketContextType>(DemarketContext);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />
                <Title main={"HOME"} />

                <section className={cx("news__wrapper")}>
                    <SubTitle
                        title={"New Items"}
                        description={"Explore our new products and find your favorites."}
                    />
                    <article className={cx("news_container")}>
                        <NftContainer
                            nfts={assetsFromSmartContract}
                            loading={loadingAssetsFromSmartContract}
                        />
                    </article>
                </section>
                <section className={cx("trending__wrapper")}>
                    <SubTitle
                        title="Trending Items"
                        description="The trending tech products of 2024. Let's shop now for the hottest products."
                    />

                    <div className={cx("trending__container")}>
                        <section className={cx("slider__wrapper")}>
                            <div className={cx("slider__list-left")}>
                                {loadingAssetsFromSmartContract
                                    ? new Array(10)
                                          .fill(null)
                                          .map(function (value: any, index: number) {
                                              return (
                                                  <NftItemSliderSkeleton
                                                      key={index}
                                                      index={index}
                                                  />
                                              );
                                          })
                                    : assetsFromSmartContract
                                          .slice(0, 10)
                                          .map(function (value: any, index: number) {
                                              return (
                                                  <NftItemSlider
                                                      value={value}
                                                      key={index}
                                                      index={index}
                                                  />
                                              );
                                          })}
                            </div>
                        </section>
                        <section className={cx("slider__wrapper")}>
                            <div className={cx("slider__list-right")}>
                                {loadingAssetsFromSmartContract
                                    ? new Array(10)
                                          .fill(null)
                                          .map(function (value: any, index: number) {
                                              return (
                                                  <NftItemSliderSkeleton
                                                      key={index}
                                                      index={index}
                                                  />
                                              );
                                          })
                                    : assetsFromSmartContract
                                          .slice(10, 20)
                                          .map(function (value: any, index: number) {
                                              return (
                                                  <NftItemSlider
                                                      value={value}
                                                      key={index}
                                                      index={index}
                                                  />
                                              );
                                          })}
                            </div>
                        </section>
                    </div>
                </section>
                <section className={cx("news__wrapper")}>
                    <SubTitle
                        title="Selling Items"
                        description="Find amazing works from a variety of artists on our platform."
                    />

                    <article className={cx("news_container")}>
                        <NftContainer
                            loading={loadingAssetsFromSmartContract}
                            nfts={assetsFromSmartContract}
                        />
                    </article>
                </section>
                <section className={cx("account__wrapper")}>
                    <SubTitle
                        title="Top Accounts"
                        description="Explore our most featured accounts and find the creators, entrepreneurs, and influencers you love."
                    />
                    <article className={cx("account__container")}>
                        <section className={cx("account__list--left")}>
                            {loadingAccounts
                                ? new Array(10)
                                      .fill(null)
                                      .map(function (value: any, index: number) {
                                          return (
                                              <AccountItemSliderSkeleton
                                                  key={index}
                                                  index={index}
                                              />
                                          );
                                      })
                                : accounts
                                      .slice(0, 10)
                                      .map(function (account: AccountItemType, index: number) {
                                          return (
                                              <AccountItemSilder
                                                  account={account}
                                                  key={index}
                                                  index={index}
                                              />
                                          );
                                      })}
                        </section>
                        <section className={cx("account__list--right")}>
                            {loadingAccounts
                                ? new Array(10)
                                      .fill(null)
                                      .map(function (account: any, index: number) {
                                          return (
                                              <AccountItemSliderSkeleton
                                                  key={index}
                                                  index={index}
                                              />
                                          );
                                      })
                                : accounts
                                      .slice(0, 10)
                                      .map(function (account: AccountItemType, index: number) {
                                          return (
                                              <AccountItemSilder
                                                  account={account}
                                                  key={index}
                                                  index={index}
                                              />
                                          );
                                      })}
                        </section>
                    </article>
                </section>
                <section className={cx("statistics")}>
                    <Statistics />
                </section>
                <section className={cx("donate")}>
                    <Donate />
                </section>
            </div>
        </main>
    );
};

export default Home;
