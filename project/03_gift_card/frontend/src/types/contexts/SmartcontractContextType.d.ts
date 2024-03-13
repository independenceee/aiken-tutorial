import { Lucid } from "lucid-cardano"
import { AppliedValidators } from "~/utils/apply-params"

export type SmartcontractContextType = {
    redeemGiftCard: () => Promise<void>
    createGiftCard: () => Promise<void>
    submitTokenName: () => Promise<void>
    connectWallet: () => Promise<void>
    lucid: Lucid | null
    giftADA: string | undefined
    setGiftADA: React.Dispatch<React.SetStateAction<string | undefined>>
    tokenName: string
    setTokenName: React.Dispatch<React.SetStateAction<string>>
    parameterizedContracts: AppliedValidators | null
    lockTxHash: string | undefined
    waitingLockTx: boolean
    unlockTxHash: string | undefined 
    waitingUnlockTx: boolean
}