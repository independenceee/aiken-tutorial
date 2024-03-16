"use client";

import React, { ReactNode, useContext, useState } from "react";
import SmartcontractContext from "../components/SmartcontractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "../components/LucidContext";
import applyParams, { AppliedValidators } from "~/utils/apply-params";
import readValidators from "~/utils/read-validator";
import { Constr, Data, fromText } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

const SmartcontractProvider = function ({ children }: Props) {
    const { lucid } = useContext<LucidContextType>(LucidContext);

    const [tokenName, setTokenName] = useState<string>("");
    const [parameterizedContracts, setParameterizedContracts] =
        useState<AppliedValidators | null>(null);
    const [tAda, setTAda] = useState<string>("");
    const [lockTxHash, setLockTxHash] = useState<string>("");
    const [unLockTxHash, setUnLockTxHash] = useState<string>("");
    const [waitingLockTx, setWaitingLockTx] = useState<boolean>(false);
    const [waitingUnLockTx, setWaitingUnLockTx] = useState<boolean>(false);

    const lockGiftcard = async function () {
        try {
            setWaitingLockTx(true);

            const lovelace = Number(tAda) * 1000000;

            const assetName = `${parameterizedContracts!.policyId}${fromText(
                tokenName
            )}`;

            const mintRedeemer = Data.to(new Constr(0, []));

            const utxos = await lucid.wallet.getUtxos();

            const utxo = utxos[0];

            const tx = await lucid
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

            const success = await lucid.awaitTx(txHash);

            setTimeout(() => {
                setWaitingLockTx(false);
                if (success) {
                    setLockTxHash(txHash);
                }
            }, 3000);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingLockTx(false);
        }
    };

    const unLockGiftcard = async function () {
        try {
            setWaitingUnLockTx(true);

            const utxos = await lucid.utxosAt(
                parameterizedContracts!.lockAddress
            );

            const assetName = `${parameterizedContracts!.policyId}${fromText(
                tokenName
            )}`;

            const burnRedeemer = Data.to(new Constr(1, []));

            const tx = await lucid
                .newTx()
                .collectFrom(utxos, Data.void())
                .attachMintingPolicy(parameterizedContracts!.giftCard)
                .attachSpendingValidator(parameterizedContracts!.redeem)
                .mintAssets({ [assetName]: BigInt(-1) }, burnRedeemer)
                .complete();

            const txSigned = await tx.sign().complete();
            const txHash = await txSigned.submit();

            const success = await lucid.awaitTx(txHash);

            setWaitingUnLockTx(false);

            if (success) {
                setUnLockTxHash(txHash);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingUnLockTx(false);
        }
    };

    const submitTokenName = async function () {
        const utxos = await lucid.wallet.getUtxos();
        const validators = readValidators();

        const utxo = utxos[0];

        const outputReference = {
            txHash: utxo.txHash,
            outputIndex: utxo.outputIndex,
        };

        const contracts = applyParams({
            tokenName: tokenName,
            lucid: lucid,
            outputReference: outputReference,
            validators: validators,
        });

        setParameterizedContracts(contracts);
    };
    return (
        <SmartcontractContext.Provider
            value={{
                lockGiftcard,
                lockTxHash,
                parameterizedContracts,
                unLockTxHash,
                waitingLockTx,
                waitingUnLockTx,
                submitTokenName,
                setTAda,
                setTokenName,
                tAda,
                tokenName,
                unLockGiftcard,
            }}
        >
            {children}
        </SmartcontractContext.Provider>
    );
};

export default SmartcontractProvider;
