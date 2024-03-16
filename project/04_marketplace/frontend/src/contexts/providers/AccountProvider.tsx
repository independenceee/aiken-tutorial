"use client";

import React, { ReactNode, useState, useContext, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AccountContext from "@/contexts/components/AccountContext";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import fetchInfomationCollection from "@/utils/fetchInfomationCollection";
import { AccountItemType, NftItemType } from "@/types/GenericsType";
import { get, post } from "@/utils/http-request";
import { toast } from "react-toastify";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "../components/LucidContext";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const { id: walletAddressParams }: any = useParams();

    const { lucidWallet, walletAddress } = useContext<LucidContextType>(LucidContext);
    const searchParams: any = useSearchParams();
    const [walletAddressQuery, setWalletAddressQuery] = useState<string>("");

    const { assetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);

    const [account, setAccount] = useState<AccountItemType>(null!);
    const [loadingAccount, setLoadingAccount] = useState<boolean>(false);

    const [assetsFromAddress, setAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageAssetsFromAddress, setCurrentPageAssetsFromAddress] = useState<number>(1);
    const [totalPagesAssetsFromAddress, setTotalPagesAssetsFromAddress] = useState<number>(1);
    const [loadingAssetsFromAddress, setLoadingAssetsFromAddress] = useState<boolean>(false);

    const [createdAssetsFromAddress, setCreatedAssetsFromAddress] = useState<NftItemType[]>([]);
    const [loadingCreatedAssetsFromAddress, setLoadingCreatedAssetsFromAddress] = useState<boolean>(false);
    const [totalPagesCreatedAssetsFromAddress, setTotalPagesCreatedAssetsFromAddress] = useState<number>(1);
    const [currentPageCreatedAssetsFromAddress, setCurrentPageCreatedAssetsFromAddress] = useState<number>(1);

    const [sellingAssetsFromAddress, setSellingAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageSellingAssetsFromAddress, setCurrentPageSellingAssetsFromAddress] = useState<number>(1);
    const [loadingSellingAssetsFromAddress, setLoadingSellingAssetsFromAddress] = useState<boolean>(false);
    const [totalPagesSellingAssetsFromAddress, setTotalPagesSellingAssetsFromAddress] = useState<number>(1);

    const [likeAssetsFromAddress, setLikeAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageLikeAssetsFromAddress, setCurrentPageLikeAssetsFromAddress] = useState<number>(1);
    const [loadingLikeAssetsFromAddress, setLoadingLikeAssetsFromAddress] = useState<boolean>(true);
    const [totalPagesLikeAssetsFromAddress, setTotalPagesLikeAssetsFromAddress] = useState<number>(1);

    useEffect(() => {
        const address = searchParams.get("address");
        setWalletAddressQuery(String(address));
    }, [searchParams]);

    useEffect(() => {
        const fetchAccountFromAddress = async function () {
            try {
                setLoadingAccount(true);
                const account: AccountItemType = await post("/account", {
                    walletAddress: walletAddress,
                });
                setAccount(account);
                toast.success("Login account successfully.");
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAccount(false);
            }
        };
        if (lucidWallet) {
            fetchAccountFromAddress();
        }
    }, [lucidWallet]);

    useEffect(() => {
        const fetchAssetsFromAddress = async function () {
            try {
                setLoadingAssetsFromAddress(true);
                const { paginatedData, totalPage } = await post(`/koios/assets/address-assets?page=${currentPageAssetsFromAddress}&pageSize=${12}`, {
                    address: walletAddressParams || walletAddressQuery,
                });

                const assetsFromAddress = await Promise.all(
                    paginatedData.map(async ({ policy_id, asset_name, quantity }: any) => {
                        if (policy_id !== "" && asset_name !== "" && quantity === "1") {
                            const data = await fetchInformationAsset({
                                policyId: policy_id,
                                assetName: asset_name,
                            });
                            if (data) return { ...data };
                            return null;
                        }
                    }),
                );

                setAssetsFromAddress(assetsFromAddress.filter(Boolean));
                setTotalPagesAssetsFromAddress(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAssetsFromAddress(false);
            }
        };
        if (walletAddressParams || walletAddressQuery) {
            fetchAssetsFromAddress();
        }
    }, [walletAddressParams, currentPageAssetsFromAddress, assetsFromSmartContract, walletAddressQuery]);

    useEffect(() => {
        const fetchCreatedAssetsFromAddress = async function () {
            try {
                setLoadingCreatedAssetsFromAddress(true);
                const createdAssetsList = assetsFromAddress.filter(function (asset: NftItemType) {
                    return asset.authorAddress === walletAddressParams || asset.authorAddress === walletAddressQuery;
                });

                const sellingAssetsList = assetsFromSmartContract.filter(function (asset: NftItemType) {
                    return asset.authorAddress === walletAddressParams || asset.authorAddress === walletAddressQuery;
                });

                setCreatedAssetsFromAddress([...createdAssetsList, ...sellingAssetsList]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingCreatedAssetsFromAddress(false);
            }
        };
        if (walletAddressParams || walletAddressQuery) {
            fetchCreatedAssetsFromAddress();
        }
    }, [walletAddressParams, walletAddressQuery, assetsFromSmartContract, assetsFromAddress]);

    useEffect(() => {
        const fetchSellingsAsset = async function () {
            try {
                setLoadingSellingAssetsFromAddress(true);
                const sellingAssetsList = assetsFromSmartContract.filter(function (asset: NftItemType) {
                    return asset.sellerAddress === walletAddressParams || asset.sellerAddress === walletAddressQuery;
                });
                setSellingAssetsFromAddress(sellingAssetsList);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingSellingAssetsFromAddress(false);
            }
        };
        if (walletAddressParams || walletAddressQuery) {
            fetchSellingsAsset();
        }
    }, [walletAddressParams, walletAddressQuery, assetsFromSmartContract]);

    useEffect(() => {
        const fetchLikeAsset = async function () {
            try {
                setLoadingLikeAssetsFromAddress(true);
                const { nfts, totalPage } = await get(`/nft`, {
                    walletAddress: walletAddressParams,
                });

                const likeAssetsFromAddress = await Promise.all(
                    nfts.map(async function ({ policyId, assetName }: any) {
                        const data = await fetchInfomationCollection({
                            policyId: policyId,
                            assetName: assetName,
                        });
                        if (data) return { ...data };
                        return null;
                    }),
                );

                setLikeAssetsFromAddress(likeAssetsFromAddress.filter(Boolean));
                setTotalPagesLikeAssetsFromAddress(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingLikeAssetsFromAddress(false);
            }
        };

        if (walletAddressParams) {
            fetchLikeAsset();
        }
    }, [walletAddressParams]);

    return (
        <AccountContext.Provider
            value={{
                account,
                loadingAccount,
                setAccount,

                assetsFromAddress,
                setAssetsFromAddress,
                currentPageAssetsFromAddress,
                setCurrentPageAssetsFromAddress,
                totalPagesAssetsFromAddress,
                setTotalPagesAssetsFromAddress,
                loadingAssetsFromAddress,
                setLoadingAssetsFromAddress,

                likeAssetsFromAddress,
                setLikeAssetsFromAddress,
                currentPageLikeAssetsFromAddress,
                setCurrentPageLikeAssetsFromAddress,
                loadingLikeAssetsFromAddress,
                setLoadingLikeAssetsFromAddress,
                setTotalPagesLikeAssetsFromAddress,
                totalPagesLikeAssetsFromAddress,

                createdAssetsFromAddress,
                setCreatedAssetsFromAddress,
                currentPageCreatedAssetsFromAddress,
                setCurrentPageCreatedAssetsFromAddress,
                totalPagesCreatedAssetsFromAddress,
                setTotalPagesCreatedAssetsFromAddress,
                loadingCreatedAssetsFromAddress,
                setLoadingCreatedAssetsFromAddress,

                sellingAssetsFromAddress,
                setSellingAssetsFromAddress,
                currentPageSellingAssetsFromAddress,
                setCurrentPageSellingAssetsFromAddress,
                totalPagesSellingAssetsFromAddress,
                setTotalPagesSellingAssetsFromAddress,
                loadingSellingAssetsFromAddress,
                setLoadingSellingAssetsFromAddress,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
