import { Lucid } from "lucid-cardano"

export type SmartcontractContextType = {
    lockHelloworld: ({ lucid }: { lucid: Lucid }) => Promise<void>;
    unLockHelloworld: ({ lucid }: { lucid: Lucid }) => Promise<void>;
    
    tAda: string;
    setTAda: React.Dispatch<React.SetStateAction<string>>
    lockTxHash: string;
    unLockTxHash: string;
    waitingLockTx: boolean;
    waitingUnLockTx: boolean;
}