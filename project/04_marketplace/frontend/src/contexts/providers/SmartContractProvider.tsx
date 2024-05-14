"use client";

import {
    Data,
    Lucid,
    TxHash,
    TxSigned,
    UTxO,
    Credential,
    Lovelace,
    Address,
    Constr,
    PolicyId,
    Script,
    fromText,
    TxComplete,
} from "lucid-cardano";
import React, { ReactNode, useContext, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import readValidator from "~/utils/read-validator";
import { MarketplaceDatum } from "~/constants/datum";
import { MarketplaceRedeemer } from "~/constants/redeemer";
import mintingPolicyId from "~/utils/minting-policyid";
import { ProductType } from "~/types/GenericsType";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const { refresh } = useContext<WalletContextType>(WalletContext);
    const [txHashRefund, setTxHashRefund] = useState<TxHash>("");
    const [waiting, setWaiting] = useState<boolean>(false);

    const buy = async function ({ lucid, products }: { lucid: Lucid; products: ProductType[] }) {
        const validator: Script = readValidator();
        const contractAddress: string = lucid.utils.validatorToAddress(validator);
        const scriptUtxos: UTxO[] | any = await lucid.utxosAt(contractAddress);

        let utxos = [];
        for (let i = 0; i < products.length; i++) {
            for (let u = 0; u < scriptUtxos.length; u++) {
                const temp = Data.from<MarketplaceDatum>(scriptUtxos[u].datum, MarketplaceDatum);
                if (temp.policyId === products[i].policyId && temp.assetName === products[i].assetName) {
                    utxos.push(scriptUtxos[u]);
                }
            }
        }

        const utxoOuts: any = utxos.map(function (utxo: any) {
            return Data.from<MarketplaceDatum>(utxo.datum, MarketplaceDatum);
        });

        let tx: any = await lucid.newTx();

        for (let i = 0; i < utxos.length; i++) {
            let exchange_fee = BigInt((parseInt(utxoOuts[i].price) * 1) / 100);
            tx = await tx
                .payToAddress(String(products[i].sellerAddress), {
                    lovelace: utxoOuts[i].price as bigint,
                })
                .payToAddress(
                    "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
                    {
                        lovelace: exchange_fee as bigint,
                    },
                )
                .payToAddress(String(products[i].authorAddress), {
                    lovelace: utxoOuts[i].royalties as bigint,
                });
        }

        tx = await tx.collectFrom(utxos, MarketplaceRedeemer).attachSpendingValidator(validator).complete();
        const signedTx = await tx.sign().complete();

        const txHash: string = await signedTx.submit();
        await lucid.awaitTx(txHash);
    };

    const sell = async function ({
        policyId,
        assetName,
        authorAddress,
        price,
        royalties,
        lucid,
    }: {
        policyId: string;
        assetName: string;
        authorAddress: string;
        price: bigint;
        royalties: bigint;
        lucid: Lucid;
    }) {
        const validator: Script = readValidator();
        const contractAddress: string = lucid.utils.validatorToAddress(validator);

        const sellerPublicKey: string = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential
            ?.hash as string;
        const authorPublicKey: string = lucid.utils.getAddressDetails(authorAddress as string).paymentCredential
            ?.hash as string;

        const datum = Data.to(
            {
                policyId: policyId,
                assetName: assetName,
                seller: sellerPublicKey,
                author: authorPublicKey,
                price: price,
                royalties: royalties,
            },
            MarketplaceDatum,
        );

        const tx = await lucid
            .newTx()
            .payToContract(contractAddress, { inline: datum }, { [policyId + assetName]: BigInt(1) })
            .complete();
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        const success = await lucid.awaitTx(txHash);
    };

    const refund = async function ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: PolicyId;
        assetName: string;
    }) {
        try {
            const validator: Script = readValidator();

            const scriptAddress: string = lucid.utils.validatorToAddress(validator);
            const scriptUtxos = await lucid.utxosAt(scriptAddress);
            let existAsset: any;

            const utxos = scriptUtxos.filter((asset: any, index: number) => {
                const checkAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
                if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
                    existAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
                    return true;
                }
                return false;
            });

            const tx = await lucid
                .newTx()
                .collectFrom(utxos, MarketplaceRedeemer)
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            const success = await lucid.awaitTx(txHash);
            if (success) {
                setTxHashRefund(txHash);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setWaiting(false);
        }
    };

    const collection = async function ({
        lucid,
        title,
        description,
        avatar,
        cover,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        avatar: string;
        cover: string;
    }) {
        const { mintingPolicy, policyId } = await mintingPolicyId({ lucid: lucid });
        const tx: TxComplete = await lucid
            .newTx()
            .mintAssets({ [policyId]: BigInt(1) })
            .attachMetadata(721, {
                [policyId]: {
                    [""]: {
                        avatar: avatar,
                        cover: cover,
                        title: title,
                        description: description,
                    },
                },
            })
            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy)
            .complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: string = await signedTx.submit();
        await lucid.awaitTx(txHash);
    };

    const mint = async function ({
        lucid,
        title,
        description,
        url,
        mediaType,
        metadata,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        mediaType: string;
        url: string;
        metadata: any;
    }): Promise<any> {
        try {
            const { mintingPolicy, policyId } = await mintingPolicyId({
                lucid: lucid,
            });
            const assetName = fromText(title);
            const cleanedData = Object.fromEntries(
                Object.entries(metadata).filter(function ([key, value]) {
                    return key !== "";
                }),
            );
            const tx = await lucid
                .newTx()
                .mintAssets({ [policyId + assetName]: BigInt(1) })
                .attachMetadata(721, {
                    [policyId]: {
                        [title]: {
                            name: title,
                            description: description,
                            image: url,
                            mediaType: mediaType,
                            ...cleanedData,
                        },
                    },
                })
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            await lucid.awaitTx(txHash);
        } catch (error) {
            console.log(error);
        }
    };

    const burn = async function ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
    }) {
        try {
            const { mintingPolicy, policyId } = await mintingPolicyId({ lucid: lucid });

            const unit = policyId + fromText(assetName);
            const tx = await lucid
                .newTx()
                .mintAssets({ [unit]: BigInt(-1) })
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SmartContractContext.Provider
            value={{
                burn,
                buy,
                collection,
                mint,
                refund,
                sell,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
