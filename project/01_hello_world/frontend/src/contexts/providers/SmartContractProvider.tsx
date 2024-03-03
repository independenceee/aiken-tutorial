"use client";

import React, { ChangeEvent, ReactNode, useContext, useState } from "react";
import SmartContractContext from "../components/SmartContractContext";
import {
    Data,
    Lovelace,
    Lucid,
    Script,
    TxComplete,
    TxHash,
    TxSigned,
    fromText,
} from "lucid-cardano";
import { HelloWorldDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validators";
import { HelloWorldRedeemer } from "~/constants/redeemer";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [tADA, setTADA] = useState<string>("");
    const [lockTxHash, setLockTxHash] = useState<string>("");
    const [waitingLockTx, setWaitingLockTx] = useState<boolean>(false);
    const [unlockTxHash, setUnlockTxHash] = useState<string>("");
    const [waitingUnlockTx, setWaitingUnlockTx] = useState<boolean>(false);

    const lockHelloworld = async function ({ lucid }: { lucid: Lucid }) {
        try {
            setWaitingLockTx(true);
            const ownerPublicKeyHash = lucid.utils.getAddressDetails(
                await lucid.wallet.address()
            ).paymentCredential?.hash!;

            const datum = Data.to(
                {
                    owner: ownerPublicKeyHash,
                },
                HelloWorldDatum
            );
            const validators: Script = readValidator();

            const contractAddress = lucid.utils.validatorToAddress(validators);

            const tx: TxComplete = await lucid
                .newTx()
                .payToContract(
                    contractAddress,
                    { inline: datum },
                    { lovelace: BigInt(Number(tADA) * 1000000) }
                )
                .complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            await lucid.awaitTx(txHash);
            setLockTxHash(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingLockTx(false);
        }
    };

    const unLockHelloword = async function ({ lucid }: { lucid: Lucid }) {
        try {
            setWaitingUnlockTx(true);
            const redeemer = Data.to(
                { msg: fromText("Hello, World!") },
                HelloWorldRedeemer
            );
            const validator: Script = readValidator();
            const contractAddress: string =
                lucid.utils.validatorToAddress(validator);
            const scriptUtxos = await lucid.utxosAt(contractAddress);

            const tx: TxComplete = await lucid
                .newTx()
                .collectFrom(scriptUtxos, redeemer)
                .attachSpendingValidator(validator)
                .addSigner(await lucid.wallet.address())
                .complete();

            const signedTx: TxSigned = await tx.sign().complete();

            const txHash: TxHash = await signedTx.submit();
            await lucid.awaitTx(txHash);
            setUnlockTxHash(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingUnlockTx(false);
        }
    };

    return (
        <SmartContractContext.Provider
            value={{
                tADA,
                setTADA,
                lockTxHash,
                unlockTxHash,
                waitingLockTx,
                waitingUnlockTx,
                lockHelloworld,
                unLockHelloword,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
