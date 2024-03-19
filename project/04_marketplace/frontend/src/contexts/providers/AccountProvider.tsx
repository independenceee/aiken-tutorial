"use client";

import React, { ReactNode, useState, useContext, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AccountContext from "@/contexts/components/AccountContext";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import fetchInfomationCollection from "@/utils/fetchInfomationCollection";
import { GlobalStateContextType } from "@/types/GlobalStateContextType";
import GlobalStateContext from "@/contexts/components/GlobalStateContext";
import { AccountItemType, CollectionItemType, NftItemType, RevalidateType } from "@/types/GenericsType";
import { get, post, del } from "@/utils/http-request";
import { toast } from "react-toastify";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const { id: walletAddressParams }: any = useParams();
    const searchParams: any = useSearchParams();
    const [walletAddressQuery, setWalletAddressQuery] = useState<string>("");

    const { walletItem } = useContext<LucidContextType>(LucidContext);
    const { assetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);
    const { revalidate, setRevalidate } = useContext<GlobalStateContextType>(GlobalStateContext);

    const [account, setAccount] = useState<AccountItemType>(null!);
    const [loadingAccount, setLoadingAccount] = useState<boolean>(false);

    const [collectionsFromAddress, setCollectionsFromAddress] = useState<CollectionItemType[]>([]);
    const [loadingCollectionsFromAddress, setLoadingCollectionsFromAddress] = useState<boolean>(false);
    const [totalPagesCollectionsFromAddress, setTotalPagesCollectionsFromAddress] = useState<number>(1);
    const [currentPageCollectionsFromAddress, setCurrentPageCollectionsFromAddress] = useState<number>(1);

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
                    walletAddress: walletItem.walletAddress,
                });
                setAccount(account);
                toast.success("Login account successfully.");
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAccount(false);
            }
        };
        if (walletItem.walletAddress) {
            fetchAccountFromAddress();
        }
    }, [walletItem.walletAddress]);

    useEffect(() => {
        const fetchAssetsFromAddress = async function () {
            try {
                setLoadingAssetsFromAddress(true);
                setLoadingCollectionsFromAddress(true);
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

                const collectionsFromAddress = await Promise.all(
                    paginatedData.map(async function ({ policy_id, asset_name, quantity }: any) {
                        if (policy_id !== "" && asset_name === "" && quantity === "1") {
                            const data = await fetchInfomationCollection({
                                policyId: policy_id,
                                assetName: asset_name,
                            });
                            if (data) return { ...data };
                            return null;
                        }
                    }),
                );

                setCollectionsFromAddress(collectionsFromAddress.filter(Boolean));
                setTotalPagesCollectionsFromAddress(totalPage);
                setAssetsFromAddress(assetsFromAddress.filter(Boolean));
                setTotalPagesAssetsFromAddress(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAssetsFromAddress(false);
                setLoadingCollectionsFromAddress(false);
            }
        };
        if (walletAddressParams || walletAddressQuery) {
            fetchAssetsFromAddress();
        }
    }, [walletAddressParams, currentPageAssetsFromAddress, assetsFromSmartContract, revalidate.account, walletAddressQuery]);

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
    }, [walletAddressParams, walletAddressQuery, assetsFromSmartContract, revalidate.account]);

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

    const [followers, setFollowers] = useState<AccountItemType[]>([]);
    const [currentPageFollowers, setCurrentPageFollowers] = useState<number>(1);
    const [totalPagesFollowers, setTotalPagesFollowers] = useState<number>(1);
    const [loadingFollowers, setLoadingFollowers] = useState<boolean>(false);

    useEffect(() => {
        const fetchFollowers = async function () {
            try {
                setLoadingFollowers(true);
                const { accounts, totalPage } = await get("/account/followed", {
                    params: {
                        walletAddress: walletAddressParams,
                        page: currentPageFollowers,
                        pageSize: 12,
                    },
                });

                setFollowers(accounts);
                setTotalPagesFollowers(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingFollowers(false);
            }
        };
        if (walletAddressParams) {
            fetchFollowers();
        }
    }, [currentPageFollowers, walletAddressParams, revalidate.follower]);

    const [followings, setFollowings] = useState<AccountItemType[]>([]);
    const [currentPageFollowings, setCurrentPageFollowings] = useState<number>(1);
    const [totalPagesFollowings, setTotalPagesFollowings] = useState<number>(1);
    const [loadingFollowings, setLoadingFollowings] = useState<boolean>(false);

    useEffect(() => {
        const fetchFollowings = async function () {
            try {
                setLoadingFollowings(true);
                const { accounts, totalPage } = await get("/account/following", {
                    params: {
                        walletAddress: walletAddressParams,
                        page: currentPageFollowings,
                        pageSize: 12,
                    },
                });

                setFollowings(accounts);
                setTotalPagesFollowings(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingFollowings(false);
            }
        };
        if (walletAddressParams) {
            fetchFollowings();
        }
    }, [currentPageFollowings, walletAddressParams, revalidate.following]);

    /**
     * Follow account
     */
    const followAccount = async function ({ accountId, accountIdFollow }: { accountId: string; accountIdFollow: string }) {
        try {
            await post("/follow", {
                followingId: accountId,
                followerId: accountIdFollow,
            });

            if (walletItem.walletAddress === walletAddressParams) {
                setRevalidate(function (previous: RevalidateType) {
                    return { ...previous, follower: !revalidate.follower };
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Unfollow account
     */
    const unFollowAccount = async function ({ accountId, accountIdUnFollow }: { accountId: string; accountIdUnFollow: string }) {
        try {
            await del("/follow", {
                data: {
                    followerId: accountIdUnFollow,
                    followingId: accountId,
                },
            });

            if (walletItem.walletAddress === walletAddressParams) {
                setRevalidate(function (previous: RevalidateType) {
                    return { ...previous, following: !revalidate.following };
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

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

                followers,
                setFollowers,
                currentPageFollowers,
                setCurrentPageFollowers,
                loadingFollowers,
                setLoadingFollowers,
                totalPagesFollowers,
                setTotalPagesFollowers,

                followings,
                setFollowings,
                loadingFollowings,
                setLoadingFollowings,
                currentPageFollowings,
                setCurrentPageFollowings,
                totalPagesFollowings,
                setTotalPagesFollowings,

                collectionsFromAddress,
                setCollectionsFromAddress,
                loadingCollectionsFromAddress,
                setLoadingCollectionsFromAddress,
                totalPagesCollectionsFromAddress,
                setTotalPagesCollectionsFromAddress,
                currentPageCollectionsFromAddress,
                setCurrentPageCollectionsFromAddress,

                followAccount,
                unFollowAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
