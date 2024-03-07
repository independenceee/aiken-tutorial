export type SmartcontractContextType = {
    tAda: string;
    setTAda: React.Dispatch<React.SetStateAction<string>>
    lockUntil: string;
    setLockUntil: React.Dispatch<React.SetStateAction<string>>
    lockTxHash: string;
    unlockTxHash: string;
    waitingLockTx: boolean;
    waitingUnLockTx: boolean;

    lockVesting: ({ lucid }: { lucid: Lucid }) => Promise<void>
    unLockVesting: ({lucid}: {lucid: Lucid}) => Promise<void>
}