import { Lucid } from "lucid-cardano";
import { NftItemType } from "./GenericsType";

export type SmartContractType = {
    assetsFromSmartContract: Array<NftItemType>;
    setAssetsFromSmartContract: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    loadingAssetsFromSmartContract: boolean;
    findAssetService: ({
        policyId,
        assetName,
    }: {
        policyId: string;
        assetName: string;
    }) => Promise<any>;

    buyAssetService: ({
        lucid,
        sellerAddress,
        royaltiesAddress,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        sellerAddress: string;
        royaltiesAddress: string;
        policyId: string;
        assetName: string;
    }) => Promise<any>;

    sellAssetService: ({
        policyId,
        assetName,
        author,
        price,
        royalties,
        lucid,
    }: {
        policyId: string;
        assetName: string;
        author: string;
        price: bigint;
        royalties: bigint;
        lucid: Lucid;
    }) => Promise<any>;

    refundAssetService: ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
    }) => Promise<any>;

    mintAssetService: ({
        lucid,
        title,
        description,
        imageUrl,
        mediaType,
        customMetadata,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        mediaType: string;
        imageUrl: string;
        customMetadata: any;
    }) => Promise<any>;

    mintCollectionService: ({
        title,
        description,
        address,
        lucid,
        imageAvatar,
        imageCover,
    }: {
        lucid: Lucid;
        title: string;
        address: string;
        description: string;
        imageAvatar: string;
        imageCover: string;
    }) => Promise<any>;

    mintAssetPolicyIdService: ({
        lucid,
        title,
        description,
        imageUrl,
        mediaType,
        customMetadata,
        policyIdCollection,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        mediaType: string;
        imageUrl: string;
        customMetadata: any;
        policyIdCollection: string;
    }) => Promise<any>;

    burnAssetService: ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
    }) => Promise<any>;

    buyMoreAssetsService: ({
        lucid,
        assets,
    }: {
        lucid: Lucid;
        assets: Array<NftItemType>;
    }) => Promise<any>;
};
