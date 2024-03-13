import React from "react";
import { AppliedValidators } from "~/utils/apply-params";

export type SmartcontractContextType = {
    tAda: string;
    setTAda: React.Dispatch<React.SetStateAction<string>>;

    lockTxHash: string;
    unLockTxHash: string;

    waitingLockTx: boolean;
    waitingUnLockTx: boolean;

    tokenName: string;
    setTokenName: React.Dispatch<React.SetStateAction<string>>;

    parameterizedContracts: AppliedValidators | null;

    submitTokenName: () => Promise<void>;
    lockGiftcard: () => Promise<void>;
    unLockGiftcard: () => Promise<void>;
}