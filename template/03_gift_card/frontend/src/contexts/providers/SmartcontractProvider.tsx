"use client";

import { Blockfrost, Constr, Data, Lucid, fromText } from "lucid-cardano";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import SmartcontextContext from "~/contexts/components/SmartcontractContext";
import { AppliedValidators, applyParams } from "~/utils/apply-params";
import readValidators from "~/utils/read-validators";

type Props = {
    children: ReactNode;
};

const SmartcontextProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid | null>(null);
    const [blockfrostAPIKey, setBlockfrostAPIKey] = useState<string>("");
    const [tokenName, setTokenName] = useState<string>("");
    const [parameterizedContracts, setParameterizedContracts] =
        useState<AppliedValidators | null>(null);
    const [giftADA, setGiftADA] = useState<string | undefined>();
    const [lockTxHash, setLockTxHash] = useState<string | undefined>(undefined);
    const [waitingLockTx, setWaitingLockTx] = useState<boolean>(false);
    const [unlockTxHash, setUnlockTxHash] = useState<string | undefined>(
        undefined
    );
    const [waitingUnlockTx, setWaitingUnlockTx] = useState<boolean>(false);

    const handleChange = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setBlockfrostAPIKey(event.target.value as string);
    };

    const setupLucid = async function () {
        const lucid = await Lucid.new(
            new Blockfrost(
                "https://cardano-preprod.blockfrost.io/api/v0",
                blockfrostAPIKey
            ),
            "Preprod"
        );

        setLucid(lucid);
    };

    useEffect(() => {
        if (lucid) {
            window.cardano.nami.enable().then((wallet) => {
                lucid.selectWallet(wallet);
            });
        }
    }, [lucid]);

    const submitTokenName = async () => {
        console.log("Submit token");
        const utxos = await lucid?.wallet.getUtxos()!;

        const validators = readValidators();
        const utxo = utxos[0];
        const outputReference = {
            txHash: utxo.txHash,
            outputIndex: utxo.outputIndex,
        };

        const contracts = applyParams(
            tokenName,
            outputReference,
            validators,
            lucid!
        );

        setParameterizedContracts(contracts);
    };

    const createGiftCard = async () => {
        setWaitingLockTx(true);

        try {
            const lovelace = Number(giftADA) * 1000000;
            const assetName = `${parameterizedContracts!.policyId}${fromText(
                tokenName
            )}`;
            const mintRedeemer = Data.to(new Constr(0, []));
            const utxos = await lucid?.wallet.getUtxos()!;
            const utxo = utxos[0];

            const tx = await lucid!
                .newTx()
                .collectFrom([utxo])
                .attachMintingPolicy(parameterizedContracts!.giftCard)
                .mintAssets({ [assetName]: BigInt(1) }, mintRedeemer)
                .payToContract(
                    parameterizedContracts!.lockAddress,
                    { inline: Data.void() },
                    { lovelace: BigInt(lovelace) }
                )
                .complete();

            const txSigned = await tx.sign().complete();

            const txHash = await txSigned.submit();

            const success = await lucid!.awaitTx(txHash);
            setTimeout(() => {
                setWaitingLockTx(false);
                if (success) {
                    setLockTxHash(txHash);
                }
            }, 3000);
        } catch {
            setWaitingLockTx(false);
        }
    };

    const redeemGiftCard = async () => {
        setWaitingUnlockTx(true);
        try {
            const utxos = await lucid!.utxosAt(
                parameterizedContracts!.lockAddress
            );

            const assetName = `${parameterizedContracts!.policyId}${fromText(
                tokenName
            )}`;
            const burnRedeemer = Data.to(new Constr(1, []));

            const tx = await lucid!
                .newTx()
                .collectFrom(utxos, Data.void())
                .attachMintingPolicy(parameterizedContracts!.giftCard)
                .attachSpendingValidator(parameterizedContracts!.redeem)
                .mintAssets({ [assetName]: BigInt(-1) }, burnRedeemer)
                .complete();

            const txSigned = await tx.sign().complete();
            const txHash = await txSigned.submit();
            const success = await lucid!.awaitTx(txHash);
            setWaitingUnlockTx(false);
            if (success) {
                setUnlockTxHash(txHash);
            }
        } catch {
            setWaitingUnlockTx(false);
        }
    };
    return (
        <SmartcontextContext.Provider
            value={{
                waitingUnlockTx,
                lockTxHash,
                unlockTxHash,
                waitingLockTx,
                giftADA,
                setGiftADA,
                tokenName,
                setTokenName,
                setBlockfrostAPIKey,
                redeemGiftCard,
                createGiftCard,
                lucid,
                setupLucid,
                submitTokenName,
                parameterizedContracts,
            }}
        >
            {children}
        </SmartcontextContext.Provider>
    );
};

export default SmartcontextProvider;
