"use client";

import { useParams } from "next/navigation";
import React, { useState, useContext, ChangeEvent } from "react";
import classNames from "classnames/bind";
import Container from "~/components/Product/Container";
import Link from "next/link";
import styles from "./Detail.module.scss";
import Title from "~/components/Title";
import History from "~/components/History";
import { get } from "~/utils/http-request";
import { useQuery } from "@tanstack/react-query";
import checkMediaType from "~/helpers/check-media-type";
import convertIpfsAddressToUrl from "~/helpers/convert-ipfs-to-url";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import Copy from "~/components/Copy";
import images from "~/assets/images";
import convertHexToString from "~/helpers/convert-hex-to-string";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
type Props = {};

const Detail = function ({}: Props) {
    const [page, setPage] = useState<number>(1);
    const { unit }: any = useParams();
    const [policyId] = useState<string>(unit.slice(0, 56));
    const [assetName] = useState<string>(unit.slice(56));
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const { sell, buy, refund } = useContext<SmartContractContextType>(SmartContractContext);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Marketplaces", page],
        queryFn: () => get(`/marketplaces?page=${page}&pageSize=12`),
    });

    const {
        data: product,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
    } = useQuery({
        queryKey: ["Product", page],
        queryFn: () => get(`/marketplaces?policyId=${policyId}&assetName=${assetName}`),
        enabled: Boolean(policyId) || Boolean(assetName),
    });

    const {
        data: histories,
        isLoading: isLoadingHistories,
        isError: isErrorHistories,
    } = useQuery({
        queryKey: ["Histories", page],
        queryFn: () => get(`/histories?policyId=${policyId}&assetName=${assetName}&page=${page}&pageSize=12`),
        enabled: Boolean(policyId) && Boolean(assetName),
    });
    const [price, setPrice] = useState<string>("");
    const handleInputPrice = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPrice(event.target.value);
    };
    const handleSell = async function () {
        await sell({
            lucid: lucid,
            policyId: product.policyId,
            assetName: product.assetName,
            authorAddress: product.authorAddress,
            price: BigInt(Number(price) * 1000000),
            royalties: BigInt((Number(price) * 1000000) / 100),
        });
    };

    const handleBuy = async function () {
        await buy({
            lucid: lucid,
            products: [product],
        });
    };

    const handleRefund = async function () {
        await refund({
            lucid: lucid,
            policyId: product.policyId,
            assetName: product.assetName,
        });
    };
    console.log(product?.currentAddress);
    console.log(wallet?.address);
    console.log(product?.currentAddress === wallet?.address);

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                <section className={cx("about")}>
                    <main className={cx("content__wrapper")}>
                        <section className={cx("content__left")}>
                            <div className={cx("content__image")}>
                                {checkMediaType(String(product?.metadata?.mediaType), "image") && (
                                    <img
                                        className={cx("content__image--image")}
                                        src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                        alt=""
                                    />
                                )}
                                {checkMediaType(String(product?.metadata?.mediaType), "video") && (
                                    <video autoPlay controls muted loop className={cx("content__image--image")}>
                                        <source
                                            src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}

                                {checkMediaType(String(product?.metadata?.mediaType), "application") && (
                                    <iframe
                                        className={cx("content__image--image")}
                                        src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                    ></iframe>
                                )}

                                {checkMediaType(String(product?.metadata?.mediaType), "audio") && (
                                    <audio controls>
                                        <source
                                            src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                            type="audio/mpeg"
                                        />
                                    </audio>
                                )}
                            </div>
                        </section>

                        <section className={cx("content__right")}>
                            <section className={cx("detail__content")}>
                                <title>{convertHexToString(product?.assetName)}</title>
                                <h2 className={cx("asset__name")}>{convertHexToString(product?.assetName)}</h2>
                                <div className={cx("description")}>
                                    <span>Type:</span> {product?.metadata?.mediaType.split("/").pop()}
                                </div>
                                <div className={cx("description")}>
                                    <span>Fingerprint:</span>
                                    {product?.fingerprint}
                                    <Copy value={product?.fingerprint} />
                                </div>
                                <div className={cx("description")}>
                                    <span>PolicyId:</span> {product?.policyId}
                                    <Copy value={product?.policyId} />
                                </div>
                                <div className={cx("people__wrapper")}>
                                    <section className={cx("people__container")}>
                                        <header className={cx("people__header")}>Owner</header>
                                        <div className={cx("address__copy")}>
                                            <Link
                                                href={`/account/${product?.metadata?.sellerAddress}`}
                                                className={cx("people__content")}
                                            >
                                                <div className={cx("people__avatar")}>
                                                    <Image
                                                        className={cx("people__avatar--image")}
                                                        src={images.user}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className={cx("people__information")}>
                                                    <h3 className={cx("people__name")}>
                                                        {product?.stakekeySellerAddress}
                                                    </h3>
                                                    <div className={cx("people__address")}>
                                                        <p>{product?.sellerAddress}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Copy value={product?.sellerAddress} />
                                        </div>
                                    </section>
                                    <section className={cx("people__container")}>
                                        <header className={cx("people__header")}>Author</header>
                                        <div className={cx("address__copy")}>
                                            <Link
                                                href={`/account/${product?.authorAddress}`}
                                                className={cx("people__content")}
                                            >
                                                <div className={cx("people__avatar")}>
                                                    <Image
                                                        className={cx("people__avatar--image")}
                                                        src={images.user}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className={cx("people__information")}>
                                                    <h3 className={cx("people__name")}>
                                                        {product?.stakekeyAuthorAddress}
                                                    </h3>
                                                    <div className={cx("people__address")}>
                                                        <p>{product?.authorAddress}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Copy value={product?.authorAddress} />
                                        </div>
                                    </section>
                                </div>
                            </section>
                            {product?.price && product?.sellerAddress !== wallet?.address && (
                                <section className={cx("price__wrapper")}>
                                    <header className={cx("price__header")}>
                                        ₳ {Number(product?.price) / 1000000}{" "}
                                    </header>
                                    <article className={cx("price__container")}>
                                        <Button className={cx("search-btn")} onClick={handleBuy}>
                                            {true ? (
                                                "Buy asset"
                                            ) : (
                                                <ClipLoader size={25} color="#7000ff" speedMultiplier={1} />
                                            )}
                                        </Button>
                                    </article>
                                </section>
                            )}

                            {product?.price && product?.sellerAddress === wallet?.address && (
                                <section className={cx("price__wrapper")}>
                                    <header className={cx("price__header")}>
                                        ₳ {Number(product?.price) / 1000000}
                                    </header>
                                    <article className={cx("price__container")}>
                                        <Button className={cx("search-btn")} onClick={handleRefund}>
                                            {true ? (
                                                "Refund asset"
                                            ) : (
                                                <ClipLoader size={25} color="#7000ff" speedMultiplier={1} />
                                            )}
                                        </Button>
                                    </article>
                                </section>
                            )}

                            {product?.sellerAddress?.trim() === wallet?.address?.trim() && !product?.price ? (
                                <section className={cx("price__wrapper--input")}>
                                    <article className={cx("price__container--input")}>
                                        <input
                                            value={price}
                                            spellCheck={false}
                                            type="text"
                                            onChange={handleInputPrice}
                                            placeholder="Enter the price ..."
                                        />

                                        <Button className={cx("sell-btn")} onClick={handleSell}>
                                            {true ? (
                                                "Sell asset"
                                            ) : (
                                                <ClipLoader size={25} color="#7000ff" speedMultiplier={1} />
                                            )}
                                        </Button>
                                    </article>
                                </section>
                            ) : null}
                        </section>
                    </main>
                </section>
                <section>
                    <Title title="History" />
                    <History
                        page={page}
                        setPage={setPage}
                        data={histories}
                        isError={isErrorHistories}
                        isLoading={isLoadingHistories}
                        className={cx("orders")}
                    />
                </section>

                <section className={cx("other")}>
                    <Title title="More Items" />
                    <article className={cx("inner")}>
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                        />
                    </article>
                </section>
            </div>
        </main>
    );
};

export default Detail;
