import React, { ReactNode, useState, createContext, useEffect } from "react";
import {
    Blockfrost,
    Data,
    Lucid,
    Script,
    TxComplete,
    TxHash,
    TxSigned,
    UTxO,
} from "lucid-cardano";
import readValidator from "../utils/read-validator";
import { MarketplaceDatum } from "../constants/datum";
import { MarketplaceRedeemer } from "../constants/redeemer";
import fetchPublicKeyFromAddress from "../utils/fetchPublicKeyFromAddress";
import fetchInformationAsset from "../utils/fetchInformationAsset";

type Props = {
    children: ReactNode;
};

export type ProductType = {
    assetName: string;
    authorAddress?: string;
    currentAddress?: string;
    description?: string;
    fingerprint?: string;
    image?: string;
    mediaType?: string;
    name?: string | any;
    policyId: string;
    sellerAddress?: string;
    stakekeyAuthorAddress?: string;
    stakekeySellerAddress?: string;
    price?: bigint;
    royalties?: bigint;
    id?: string;
    countOfTransaction?: number;
    createdAt?: string;
    status?: string;
    updatedAt?: string;
    validate?: boolean;
    collection?: string;
};

export type SmartcontractType = {
    buy: ({
        lucid,
        policyId,
        assetName,
        sellerAddress,
        royaltiesAddress,
    }: {
        lucid: Lucid;
        sellerAddress: string;
        royaltiesAddress: string;
        policyId: string;
        assetName: string;
    }) => Promise<TxHash>;
    sell: ({
        lucid,
        policyId,
        assetName,
        authorAddress,
        price,
        royalties,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
        authorAddress: string;
        price: bigint;
        royalties: bigint;
    }) => Promise<TxHash>;

    refund: ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
    }) => Promise<void>;

    assetsFromSmartContract: ProductType[];
};

export const SmartcontractContext = createContext<SmartcontractType>(null!);

const SmartcontractProvider = function ({ children }: Props) {
    const [txHash, setTxHash] = useState<TxHash>("");
    const [waiting, setWaiting] = useState<boolean>(false);

    const listAssets = async function ({
        lucid,
    }: {
        lucid: Lucid;
    }): Promise<ProductType[] | any> {
        try {
            if (lucid) {
                const validator: Script = await readValidator();
                const contractAddress: string =
                    lucid.utils.validatorToAddress(validator);
                const scriptAssets: UTxO[] = await lucid.utxosAt(
                    contractAddress
                );
                const assets: ProductType[] = scriptAssets.map(function (
                    asset: any,
                    index: number
                ) {
                    const datum = Data.from<MarketplaceDatum>(
                        asset.datum,
                        MarketplaceDatum
                    );
                    return datum;
                });
                return assets;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [assetsFromSmartContract, setAssetsFromSmartContract] = useState<
        ProductType[]
    >([]);
    const [loadingAssetsFromSmartContract, setLoadingAssetsFromSmartContract] =
        useState<boolean>(true);
    const fetchAssetsFromSmartContract = async function () {
        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0",
                    "preprody7qLCi4kIiAUEFRlJvmZ2PTi6jreF7gI"
                ),
                "Preprod"
            );
            const assets: ProductType[] = await listAssets({
                lucid: lucid,
            });
            if (assets) {
                const assetPromises = assets
                    .reverse()
                    .map(async function (asset: ProductType) {
                        const response: ProductType =
                            await fetchInformationAsset({
                                policyId: asset.policyId,
                                assetName: asset.assetName,
                            });
                        return {
                            ...response,
                            price: asset.price,
                            royalties: asset.royalties,
                        };
                    });

                const convertedAssets: ProductType[] = await Promise.all(
                    assetPromises
                );

                setAssetsFromSmartContract((previousAssets: ProductType[]) => {
                    const updatedAssets: ProductType[] = previousAssets.map(
                        (existingAsset: ProductType) => {
                            const matchingAsset = convertedAssets.find(
                                function (newAsset: ProductType) {
                                    return (
                                        existingAsset.policyId ===
                                        newAsset.policyId
                                    );
                                }
                            );

                            if (matchingAsset) {
                                return { ...existingAsset, ...matchingAsset };
                            }

                            return existingAsset;
                        }
                    );
                    const newAssets: ProductType[] = convertedAssets.filter(
                        (newAsset: ProductType) =>
                            !previousAssets.some(
                                (existingAsset: any) =>
                                    existingAsset.policyId === newAsset.policyId
                            )
                    );

                    return [...updatedAssets, ...newAssets];
                });
                setLoadingAssetsFromSmartContract(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(function () {
        fetchAssetsFromSmartContract();
    }, []);

    const buy = async function ({
        lucid,
        policyId,
        assetName,
        sellerAddress,
        royaltiesAddress,
    }: {
        lucid: Lucid;
        sellerAddress: string;
        royaltiesAddress: string;
        policyId: string;
        assetName: string;
    }): Promise<TxHash> {
        try {
            const validator = await readValidator();
            const contractAddress = lucid.utils.validatorToAddress(validator);
            const scriptUtxos = await lucid.utxosAt(contractAddress);
            let existAsset: any;

            const utxos = scriptUtxos.filter((utxo: any, index: number) => {
                const checkAsset = Data.from<MarketplaceDatum>(
                    utxo.datum,
                    MarketplaceDatum
                );
                if (
                    checkAsset.policyId === policyId &&
                    checkAsset.assetName === assetName
                ) {
                    existAsset = Data.from<MarketplaceDatum>(
                        utxo.datum,
                        MarketplaceDatum
                    );
                    return true;
                }
                return false;
            });

            if (utxos.length === 0) {
                console.log("utxo found");
                process.exit(1);
            }

            const exchange_fee = BigInt((parseInt(existAsset.price) * 1) / 100);

            const tx = await lucid
                .newTx()
                .payToAddress(sellerAddress, {
                    lovelace: BigInt(existAsset.price),
                })
                .payToAddress(
                    "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
                    { lovelace: exchange_fee }
                )
                .payToAddress(royaltiesAddress, {
                    lovelace: BigInt(existAsset.royalties),
                })
                .collectFrom(utxos, MarketplaceRedeemer)
                .attachSpendingValidator(validator)
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            await lucid.awaitTx(txHash);

            return txHash;
        } catch (error) {
            return "";
        } finally {
            setWaiting(false);
        }
    };

    const sell = async function ({
        lucid,
        policyId,
        assetName,
        authorAddress,
        price,
        royalties,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
        authorAddress: string;
        price: bigint;
        royalties: bigint;
    }): Promise<TxHash> {
        try {
            setWaiting(true);
            console.log("sell");
            const validator: Script = readValidator();
            const contractAddress: string =
                lucid.utils.validatorToAddress(validator);
            const authorPublicKey: string = fetchPublicKeyFromAddress(
                authorAddress!
            );
            const sellerPublicKey: string = lucid.utils.getAddressDetails(
                await lucid.wallet.address()
            ).paymentCredential?.hash as string;

            const datum: string = Data.to(
                {
                    policyId: policyId,
                    assetName: assetName,
                    seller: sellerPublicKey,
                    author: authorPublicKey,
                    price: price!,
                    royalties: royalties!,
                },
                MarketplaceDatum
            );

            const tx = await lucid
                .newTx()
                .payToContract(
                    contractAddress,
                    { inline: datum },
                    { [policyId + assetName]: BigInt(1) }
                )
                .complete();
            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) setTxHash(txHash);
            return txHash;
        } catch (error) {
            console.log(error);
            return "";
        } finally {
            setWaiting(false);
        }
    };

    const refund = async function ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
    }): Promise<void> {
        try {
            setWaiting(true);
            const validator = await readValidator();
            const scriptAddress = lucid.utils.validatorToAddress(validator);
            const scriptUtxos = await lucid.utxosAt(scriptAddress);
            let existAsset: any;

            const assets = scriptUtxos.filter((asset: any, index: number) => {
                const checkAsset = Data.from<MarketplaceDatum>(
                    asset.datum,
                    MarketplaceDatum
                );
                if (
                    checkAsset.policyId === policyId &&
                    checkAsset.assetName === assetName
                ) {
                    existAsset = Data.from<MarketplaceDatum>(
                        asset.datum,
                        MarketplaceDatum
                    );
                    return true;
                }
                return false;
            });
            if (assets.length === 0) {
                console.log("utxo found.");
                process.exit(1);
            }

            const exchange_fee = BigInt((parseInt(existAsset.price) * 1) / 100);
            if (validator) {
                const tx = await lucid
                    .newTx()
                    .collectFrom(assets, MarketplaceRedeemer)
                    .addSigner(await lucid.wallet.address())
                    .attachSpendingValidator(validator)
                    .complete();

                const signedTx = await tx.sign().complete();
                const txHash = await signedTx.submit();
                await lucid.awaitTx(txHash);
            }
        } catch (error) {
        } finally {
            setWaiting(false);
        }
    };
    return (
        <SmartcontractContext.Provider
            value={{ assetsFromSmartContract, buy, sell, refund }}
        >
            {children}
        </SmartcontractContext.Provider>
    );
};

export default SmartcontractProvider;
