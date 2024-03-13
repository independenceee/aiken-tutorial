"use client";

import React, { ReactNode, useContext, useState } from "react";
import SmartcontractContext from "../components/SmartcontractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "../components/LucidContext";
import applyParams, { AppliedValidators } from "~/utils/apply-params";
import readValidators from "~/utils/read-validator";

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

    const lockGiftcard = async function () {};

    const unLockGiftcard = async function () {};

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
