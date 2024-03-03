import { TxHash } from "lucid-cardano"

export type SmartContractContextType = {
    lockHelloworld :({lucid}: {lucid: Lucid})=> Promise<void>,
    unLockHelloword: ({lucid}: {lucid: Lucid}) => Promise<void>
    tADA: string,
    setTADA: React.Dispatch<React.SetStateAction<string>>,
    lockTxHash: string,
    unlockTxHash: string,
    waitingLockTx: boolean,
    waitingUnlockTx: boolean,
}