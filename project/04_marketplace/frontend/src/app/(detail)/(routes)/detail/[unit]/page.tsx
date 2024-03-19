"use client";

import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import classNames from "classnames/bind";
import Skeleton from "react-loading-skeleton";
import { EyeIcon, UnHeartIcon } from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import convertString from "@/helpers/convertString";
import Image from "next/image";
import images from "@/assets/images";
import CopyItem from "@/components/CopyItem";
import styles from "./Detail.module.scss";
import checkMediaType from "@/helpers/checkMediaType";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import convertHexToString from "@/helpers/convertHexToString";
import LucidContext from "@/contexts/components/LucidContext";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { SmartContractType } from "@/types/SmartContextType";
import { LucidContextType } from "@/types/LucidContextType";
import SubTitle from "@/components/SubTitle";
import Button from "@/components/Button";
import HistoryContainer from "@/components/HistoryContainer";
import MetadataContainer from "@/components/MetadataContainer";
import { CartContextType } from "@/types/CartContextType";
import CartContext from "@/contexts/components/CartContext";
import { toast } from "react-toastify";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import { DemarketContextType } from "@/types/DemarketContextType";
import DemarketContext from "@/contexts/components/DemarketContext";
import { ClipLoader } from "react-spinners";
import { GlobalStateContextType } from "@/types/GlobalStateContextType";
import GlobalStateContext from "@/contexts/components/GlobalStateContext";
import { RevalidateType } from "@/types/GenericsType";
import Link from "next/link";

const cx = classNames.bind(styles);
type Props = {};

const tabItems = [
    { id: 2, name: "History" },
    { id: 1, name: "Metadata" },
    { id: 3, name: "UTXOs" },
];

const DetailPage = function ({}: Props) {
    const { unit }: any = useParams();

    const [policyId] = useState<string>(unit.slice(0, 56));
    const [assetName] = useState<string>(unit.slice(56));

    const [isActive, setIsActive] = useState<boolean>(false);

    const { addNft } = useContext<DemarketContextType>(DemarketContext);
    const { toggleNotificationConnectWallet } = useContext<ModalContextType>(ModalContext);
    const { revalidate, setRevalidate } = useContext<GlobalStateContextType>(GlobalStateContext);
    const { assetsFromSmartContract, loadingAssetsFromSmartContract, findAssetService, sellAssetService, buyAssetService, refundAssetService } =
        useContext<SmartContractType>(SmartContractContext);
    const { lucidWallet, walletItem } = useContext<LucidContextType>(LucidContext);
    const { addToCart } = useContext<CartContextType>(CartContext);

    const [toggleTabState, setToggleTabState] = useState<number>(1);
    const [asset, setAsset] = useState<any>();
    const [price, setPrice] = useState<string>("");
    const toggleTab = function (index: number) {
        setToggleTabState(index);
    };

    const handleInputPrice = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPrice(event.target.value);
    };

    useEffect(() => {
        const fetchInformationFromPolicyIdAndAssetName = async function () {
            try {
                const informationAsset = await fetchInformationAsset({ policyId, assetName });
                const informationContract = await findAssetService({ policyId, assetName });

                setAsset({ ...informationAsset, ...informationContract });
            } catch (error) {
                console.log(error);
            }
        };
        fetchInformationFromPolicyIdAndAssetName();
    }, [revalidate.account]);

    const handleAddtoCart = async function () {
        try {
            await addToCart(asset);
            await addNft({ policyId, assetName });
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuyNft = async function () {
        try {
            setIsActive(true);
            if (lucidWallet) {
                const { txHash } = await buyAssetService({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    lucid: lucidWallet,
                    royaltiesAddress: asset.authorAddress,
                    sellerAddress: asset.sellerAddress,
                });
                if (txHash) {
                    setRevalidate(function (previous: RevalidateType) {
                        return { ...previous, account: !revalidate.account };
                    });
                    toast.success("Buy asset successfully.");
                    await addNft({ policyId, assetName });
                }
            } else {
                toggleNotificationConnectWallet();
            }
        } catch (error) {
            toast.error(String(error));
        } finally {
            setIsActive(false);
        }
    };

    const handleSellNft = async function () {
        try {
            setIsActive(true);
            if (lucidWallet) {
                const { txHash } = await sellAssetService({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    author: asset.authorAddress,
                    lucid: lucidWallet,
                    price: BigInt(Number(price) * 1000000),
                    royalties: BigInt(Number(price) * 10000),
                });
                if (txHash) {
                    setRevalidate(function (previous: RevalidateType) {
                        return { ...previous, account: !revalidate.account };
                    });
                    toast.success("Selling asset successfully.");
                    await addNft({ policyId, assetName });
                }
            } else {
                toggleNotificationConnectWallet();
            }
        } catch (error) {
            toast.error(String(error));
        } finally {
            setIsActive(false);
        }
    };

    const handleRefundNft = async function () {
        try {
            setIsActive(true);
            if (lucidWallet) {
                const { txHash } = await refundAssetService({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    lucid: lucidWallet,
                });

                if (txHash) {
                    setRevalidate(function (previous: RevalidateType) {
                        return { ...previous, account: !revalidate.account };
                    });
                    toast.success("Refund asset successfully.");
                    await addNft({ policyId, assetName });
                }
            } else {
                toggleNotificationConnectWallet();
            }
        } catch (error) {
            toast.error(String(error));
        } finally {
            setIsActive(false);
        }
    };

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                {asset ? (
                    <main className={cx("content__wrapper")}>
                        <section className={cx("content__left")}>
                            <div className={cx("content__image")}>
                                {checkMediaType(String(asset.mediaType), "image") && (
                                    <img className={cx("content__image--image")} src={String(convertIpfsAddressToUrl(asset.image))} alt="" />
                                )}
                                {checkMediaType(String(asset.mediaType), "video") && (
                                    <video autoPlay controls muted loop className={cx("content__image--image")}>
                                        <source src={String(convertIpfsAddressToUrl(asset.image))} type="video/mp4" />
                                    </video>
                                )}

                                {checkMediaType(String(asset.mediaType), "application") && (
                                    <iframe className={cx("content__image--image")} src={String(convertIpfsAddressToUrl(asset.image))}></iframe>
                                )}

                                {checkMediaType(String(asset.mediaType), "audio") && (
                                    <audio controls>
                                        <source src={String(convertIpfsAddressToUrl(asset.image))} type="audio/mpeg" />
                                    </audio>
                                )}
                                <div className={cx("content__image--left")}>
                                    <EyeIcon className={cx("icon")} />
                                </div>
                                <div className={cx("content__image--right")}>
                                    <UnHeartIcon className={cx("icon")} />
                                </div>
                            </div>
                        </section>

                        <section className={cx("content__right")}>
                            <section className={cx("detail__content")}>
                                <title>{convertHexToString(asset.assetName)}</title>
                                <h2 className={cx("asset__name")}>{convertHexToString(asset.assetName)}</h2>
                                <div className={cx("description")}>
                                    <span>Type:</span> {asset.mediaType.split("/").pop()}
                                </div>
                                <div className={cx("description")}>
                                    <span>Fingerprint:</span>
                                    {asset.fingerprint}
                                    <CopyItem value={asset.fingerprint} />
                                </div>
                                <div className={cx("description")}>
                                    <span>PolicyId:</span> {asset.policyId}
                                    <CopyItem value={asset.policyId} />
                                </div>
                                <div className={cx("people__wrapper")}>
                                    <section className={cx("people__container")}>
                                        <header className={cx("people__header")}>Owner</header>
                                        <Link href={`/account/${asset.sellerAddress}`} className={cx("people__content")}>
                                            <div className={cx("people__avatar")}>
                                                <Image className={cx("people__avatar--image")} src={images.user} alt="" />
                                            </div>
                                            <div className={cx("people__information")}>
                                                <h3 className={cx("people__name")}>{asset.stakekeySellerAddress}</h3>
                                                <div className={cx("people__address")}>
                                                    <p>{asset.sellerAddress}</p>
                                                    <CopyItem value={asset.sellerAddress} />
                                                </div>
                                            </div>
                                        </Link>
                                    </section>
                                    <section className={cx("people__container")}>
                                        <header className={cx("people__header")}>Author</header>
                                        <Link href={`/account/${asset.authorAddress}`} className={cx("people__content")}>
                                            <div className={cx("people__avatar")}>
                                                <Image className={cx("people__avatar--image")} src={images.user} alt="" />
                                            </div>
                                            <div className={cx("people__information")}>
                                                <h3 className={cx("people__name")}>{asset.stakekeyAuthorAddress}</h3>
                                                <div className={cx("people__address")}>
                                                    <p>{asset.authorAddress}</p>
                                                    <CopyItem value={asset.authorAddress} />
                                                </div>
                                            </div>
                                        </Link>
                                    </section>
                                </div>
                            </section>
                            {asset.price && asset.sellerAddress !== walletItem.walletAddress && (
                                <section className={cx("price__wrapper")}>
                                    <header className={cx("price__header")}>₳ {Number(asset.price) / 1000000} </header>
                                    <article className={cx("price__container")}>
                                        <Button className={cx("search-btn")} onClick={handleBuyNft}>
                                            {!isActive ? (
                                                "Buy asset"
                                            ) : (
                                                <ClipLoader size={25} loading={isActive} color="#7000ff" speedMultiplier={1} />
                                            )}
                                        </Button>
                                        <Button className={cx("search-btn")} onClick={handleAddtoCart}>
                                            Add to cart
                                        </Button>
                                    </article>
                                </section>
                            )}

                            {asset.price && asset.sellerAddress === walletItem.walletAddress && (
                                <section className={cx("price__wrapper")}>
                                    <header className={cx("price__header")}>₳ {Number(asset.price) / 1000000}</header>
                                    <article className={cx("price__container")}>
                                        <Button className={cx("search-btn")} onClick={handleRefundNft}>
                                            {!isActive ? (
                                                "Refund asset"
                                            ) : (
                                                <ClipLoader size={25} loading={isActive} color="#7000ff" speedMultiplier={1} />
                                            )}
                                        </Button>
                                        <Button className={cx("search-btn")} onClick={handleAddtoCart}>
                                            Add to cart
                                        </Button>
                                    </article>
                                </section>
                            )}

                            {asset.currentAddress === walletItem.walletAddress && !asset.price ? (
                                <section className={cx("price__wrapper--input")}>
                                    <article className={cx("price__container--input")}>
                                        <input
                                            value={price}
                                            spellCheck={false}
                                            type="text"
                                            onChange={handleInputPrice}
                                            placeholder="Enter the price ..."
                                        />

                                        <Button className={cx("search-btn")} onClick={handleSellNft}>
                                            {!isActive ? (
                                                "Sell asset"
                                            ) : (
                                                <ClipLoader size={25} loading={isActive} color="#7000ff" speedMultiplier={1} />
                                            )}
                                        </Button>
                                    </article>
                                </section>
                            ) : null}
                            <section className={cx("content__infomation")}>
                                <div className={cx("tabs")}>
                                    {tabItems.map(function ({ id, name }, index) {
                                        return (
                                            <button
                                                key={index}
                                                className={toggleTabState === id ? cx("tab__item--active") : cx("tab__item")}
                                                onClick={() => toggleTab(id)}
                                            >
                                                {name}
                                            </button>
                                        );
                                    })}
                                </div>

                                {toggleTabState === 2 && (
                                    <div className={cx("tab__content")}>
                                        <HistoryContainer policyId={policyId} assetsName={assetName} />
                                    </div>
                                )}
                                {toggleTabState === 1 && (
                                    <div className={cx("tab__content")}>
                                        <MetadataContainer policyId={policyId} assetName={assetName} />
                                    </div>
                                )}

                                {toggleTabState === 3 && (
                                    <div className={cx("tab__content")}>
                                        <HistoryContainer policyId={policyId} assetsName={assetName} />
                                    </div>
                                )}
                            </section>
                        </section>
                    </main>
                ) : (
                    <main className={cx("content__wrapper")}>
                        <title>Loading ...</title>
                        <section className={cx("content__left--skeleton")}>
                            <Skeleton className={cx("skeleton__item--skeleton")} />
                        </section>

                        <section className={cx("content__right--skeleton")}>
                            <section className={cx("content__content--skeleton")}>
                                <Skeleton className={cx("skeleton__item--skeleton")} />
                            </section>
                            <section className={cx("content__price--skeleton")}>
                                <Skeleton className={cx("skeleton__item--skeleton")} />
                            </section>
                            <section className={cx("content__infomation--skeleton")}>
                                <Skeleton className={cx("skeleton__item--skeleton")} />
                            </section>
                        </section>
                    </main>
                )}

                <section className={cx("other__wrapper")}>
                    <SubTitle title="More Items" />
                    <NftContainer nfts={assetsFromSmartContract} loading={loadingAssetsFromSmartContract} />
                </section>
            </div>
        </main>
    );
};

export default DetailPage;
