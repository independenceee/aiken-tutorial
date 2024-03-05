"use client";

import React, { ReactNode, useState } from "react";
import SmartcontractContext from "../components/SmartcontractContext";
import { Data, Lucid, fromText } from "lucid-cardano";
import { HelloworldDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validator";
import { HelloworldRedeemer } from "~/constants/redeemer";

type Props = {
    children: ReactNode;
};

const SmartcontractProvider = function ({ children }: Props) {
    const [tAda, setTAda] = useState<string>("");
    const [lockTxHash, setLockTxHash] = useState<string>("");
    const [waitingLockTx, setWaitingLockTx] = useState<boolean>(false);
    const [unLockTxHash, setUnLockTxHash] = useState<string>("");
    const [waitingUnLockTx, setWaitingUnLockTx] = useState<boolean>(false);

    const lockHelloworld = async function ({ lucid }: { lucid: Lucid }) {
        try {
            setWaitingLockTx(true);
            const ownerPublickeyHash = lucid.utils.getAddressDetails(
                await lucid.wallet.address()
            ).paymentCredential?.hash as string;

            const datum = Data.to(
                {
                    owner: ownerPublickeyHash,
                },
                HelloworldDatum
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

    const unLockHelloworld = async function ({ lucid }: { lucid: Lucid }) {
        try {
            setWaitingUnLockTx(true);

            const redeemer = Data.to(
                {
                    msg: fromText("Hello, World!"),
                },
                HelloworldRedeemer
            );

            const validator = readValidator();
            const contractAddress = lucid.utils.validatorToAddress(validator);

            const scriptUtoxs = await lucid.utxosAt(contractAddress);

            const tx = await lucid
                .newTx()
                .collectFrom(scriptUtoxs, redeemer)
                .attachSpendingValidator(validator)
                .addSigner(await lucid.wallet.address())
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            setUnLockTxHash(txHash);
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
                setTAda,
                lockHelloworld,
                lockTxHash,
                unLockHelloworld,
                unLockTxHash,
                waitingLockTx,
                waitingUnLockTx,
            }}
        >
            {children}
        </SmartcontractContext.Provider>
    );
};

export default SmartcontractProvider;
