"use client";

import React, { ReactNode, useContext, useState } from "react";

import {
    Data,
    Lucid,
    TxComplete,
    TxHash,
    TxSigned,
    UTxO,
    fromText,
} from "lucid-cardano";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { VestingDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validator";
import { redeemer } from "~/constants/redeemer";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [tADA, setTADA] = useState<string>("");
    const [lockUntil, setLockUntil] = useState<string>("");
    const [lockTxHash, setLockTxHash] = useState<string>("");
    const [waitingLockTx, setWaitingLockTx] = useState<boolean>(false);
    const [unlockTxHash, setUnlockTxHash] = useState<string>("");
    const [waitingUnlockTx, setWaitingUnlockTx] = useState<boolean>(false);

    const lockVesting = async function ({ lucid }: { lucid: Lucid }) {
        try {
            setWaitingLockTx(true);
            const ownerPublicKeyHash: string = lucid.utils.getAddressDetails(
                await lucid.wallet.address()
            ).paymentCredential?.hash as string;

            const beneficiaryPublicKeyHash: string =
                lucid.utils.getAddressDetails(await lucid.wallet.address())
                    .paymentCredential?.hash as string;

            const datum = Data.to(
                {
                    beneficiary: beneficiaryPublicKeyHash,
                    owner: ownerPublicKeyHash,
                    lock_until: BigInt(new Date(lockUntil).getTime()),
                },
                VestingDatum
            );

            const validator = readValidator();
            const contractAddress: string =
                lucid.utils.validatorToAddress(validator);
            const tx: TxComplete = await lucid
                .newTx()
                .payToContract(
                    contractAddress,
                    { inline: datum },
                    { lovelace: BigInt(Number(tADA) * 1000) }
                )
                .complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            lucid.awaitTx(txHash);
            setLockTxHash(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingLockTx(false);
        }
    };

    const unLockVesting = async function ({ lucid }: { lucid: Lucid }) {
        try {
            const beneficiaryPublicKeyHash = lucid.utils.getAddressDetails(
                await lucid.wallet.address()
            ).paymentCredential?.hash as string;
            const validator = readValidator();
            const contractAddress = lucid.utils.validatorToAddress(validator);
            const scriptUtxos = await lucid.utxosAt(contractAddress);
            const currentTime = new Date().getTime();
            const laterTime = new Date(
                currentTime + 2 * 60 * 60 * 1000
            ).getTime();
            const utxos: UTxO[] = scriptUtxos.filter(function (utxo) {
                let datum = Data.from(utxo.datum!, VestingDatum);
                return (
                    datum.beneficiary === beneficiaryPublicKeyHash &&
                    datum.lock_until <= currentTime
                );
            });
            const tx: TxComplete = await lucid
                .newTx()
                .collectFrom(utxos, redeemer)
                .attachSpendingValidator(validator)
                .addSigner(await lucid.wallet.address())
                .validFrom(currentTime)
                .validTo(laterTime)
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
                lockUntil,
                setLockUntil,
                lockTxHash,
                unlockTxHash,
                waitingLockTx,
                waitingUnlockTx,
                lockVesting,
                unLockVesting,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
