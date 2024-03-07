"use client";

import React, { ReactNode, useState } from "react";
import SmartcontractContext from "../components/SmartcontractContext";
import { Data, Lucid } from "lucid-cardano";
import { VestingDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validator";
import { redeemer } from "~/constants/redeemer";

type Props = {
    children: ReactNode;
};

const SmartcontractProvider = function ({ children }: Props) {
    const [tAda, setTAda] = useState<string>("");
    const [lockUntil, setLockUntil] = useState<string>("");
    const [lockTxHash, setLockTxHash] = useState<string>("");
    const [unlockTxHash, setUnlockTxHash] = useState<string>("");
    const [waitingLockTx, setWaitingLockTx] = useState<boolean>(false);
    const [waitingUnLockTx, setWaitingUnLockTx] = useState<boolean>(false);

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

            const contractAddress = lucid.utils.validatorToAddress(validator);

            const tx = await lucid
                .newTx()
                .payToContract(
                    contractAddress,
                    { inline: datum },
                    { lovelace: BigInt(Number(tAda) * 1000000) }
                )
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

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
            const utxos = scriptUtxos.filter(function (utxo) {
                let datum = Data.from(utxo.datum!, VestingDatum);
                return (
                    datum.beneficiary === beneficiaryPublicKeyHash &&
                    datum.lock_until <= currentTime
                );
            });
            const tx = await lucid
                .newTx()
                .collectFrom(utxos, redeemer)
                .attachSpendingValidator(validator)
                .addSigner(await lucid.wallet.address())
                .validFrom(currentTime)
                .validTo(laterTime)
                .complete();
            const signedTx = await tx.sign().complete();

            const txHash = await signedTx.submit();
            await lucid.awaitTx(txHash);
            setUnlockTxHash(txHash);
        } catch (error) {
            console.log(error);
        } finally {
            setWaitingUnLockTx(false);
        }
    };

    return (
        <SmartcontractContext.Provider
            value={{
                tAda,
                lockTxHash,
                lockUntil,
                lockVesting,
                setLockUntil,
                setTAda,
                unlockTxHash,
                unLockVesting,
                waitingLockTx,
                waitingUnLockTx,
            }}
        >
            {children}
        </SmartcontractContext.Provider>
    );
};

export default SmartcontractProvider;
