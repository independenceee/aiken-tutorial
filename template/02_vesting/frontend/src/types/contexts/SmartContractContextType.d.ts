import { Lucid } from "lucid-cardano"

export type SmartContractContextType = {
    tADA: string,
    lockUntil: string,
    setLockUntil: React.Dispatch<React.SetStateAction<string>>
    setTADA: React.Dispatch<React.SetStateAction<string>>,
    lockTxHash: string,
    unlockTxHash: string,
    waitingLockTx: boolean,
    waitingUnlockTx: boolean,
    lockVesting :({lucid}: {lucid: Lucid})=> Promise<void>,
    unLockVesting :({lucid}: {lucid: Lucid})=> Promise<void>
}