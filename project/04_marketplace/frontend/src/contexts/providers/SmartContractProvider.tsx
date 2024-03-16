"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import buyMoreAssetsService from "@/services/contracts/marketplace/buy-more-assets-service";
import burnAssetService from "@/services/contracts/marketplace/burn-asset";
import sellAssetService from "@/services/contracts/marketplace/sell-asset-service";
import buyAssetService from "@/services/contracts/marketplace/buy-asset-service";
import listAssetsService from "@/services/contracts/marketplace/list-assets-service";
import mintAssetService from "@/services/contracts/marketplace/mint-asset-service";
import mintCollectionService from "@/services/contracts/marketplace/mint-collection-service";
import refundAssetService from "@/services/contracts/marketplace/refund-asset-service";
import findAssetService from "@/services/contracts/marketplace/find-asset-service";
import mintAssetPolicyIdService from "@/services/contracts/marketplace/mint-asset-policyid-service";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { NftItemType } from "@/types/GenericsType";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const { lucidNeworkPlatform } = useContext<LucidContextType>(LucidContext);
    const [assetsFromSmartContract, setAssetsFromSmartContract] = useState<NftItemType[]>([]);
    const [loadingAssetsFromSmartContract, setLoadingAssetsFromSmartContract] = useState<boolean>(false);

    useEffect(() => {
        const fetchAssetsFromSmartContract = async function () {
            setLoadingAssetsFromSmartContract(true);
            try {
                const assets: NftItemType[] = await listAssetsService({
                    lucid: lucidNeworkPlatform,
                });
                if (assets) {
                    const assetPromises = assets.reverse().map(async function (asset: NftItemType) {
                        const response: NftItemType = await fetchInformationAsset({
                            policyId: asset.policyId,
                            assetName: asset.assetName,
                        });
                        return { ...response, price: asset.price, royalties: asset.royalties };
                    });

                    const convertedAssets: NftItemType[] = await Promise.all(assetPromises);

                    setAssetsFromSmartContract((previousAssets: NftItemType[]) => {
                        const updatedAssets: NftItemType[] = previousAssets.map((existingAsset: NftItemType) => {
                            const matchingAsset = convertedAssets.find(function (newAsset: NftItemType) {
                                return existingAsset.policyId === newAsset.policyId;
                            });

                            if (matchingAsset) {
                                return { ...existingAsset, ...matchingAsset };
                            }

                            return existingAsset;
                        });
                        const newAssets: NftItemType[] = convertedAssets.filter(
                            (newAsset: NftItemType) => !previousAssets.some((existingAsset: any) => existingAsset.policyId === newAsset.policyId),
                        );

                        return [...updatedAssets, ...newAssets];
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAssetsFromSmartContract(false);
            }
        };

        fetchAssetsFromSmartContract();

        // react-hooks/exhaustive-deps
    }, [lucidNeworkPlatform]);

    return (
        <SmartContractContext.Provider
            value={{
                assetsFromSmartContract,
                setAssetsFromSmartContract,
                loadingAssetsFromSmartContract,
                buyAssetService,
                burnAssetService,
                findAssetService,
                mintAssetService,
                refundAssetService,
                sellAssetService,
                mintCollectionService,
                mintAssetPolicyIdService,
                buyMoreAssetsService,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
