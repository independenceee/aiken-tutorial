import { Data, Lucid, TxComplete, TxHash, TxSigned, UTxO } from "lucid-cardano"
import readValidator from "~/utils/read-validator";
import { VestingDatum } from "~/constants/datum"
import { redeemer } from "~/constants/redeemer";

type Props = {
    lucid: Lucid;
}

const vestingUnLock = async function ({ lucid }: Props): Promise<TxHash> {
  
    const beneficiaryPublicKeyHash = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash as string;
    const validator = readValidator();
    const contractAddress = lucid.utils.validatorToAddress(validator)
    const scriptUtxos = await lucid.utxosAt(contractAddress)
    const currentTime = new Date().getTime();
    const laterTime = new Date(currentTime + 2 * 60 * 60 * 1000).getTime();
    const utxos: UTxO[] = scriptUtxos.filter(function (utxo) {
        let datum = Data.from(
            utxo.datum!,
            VestingDatum
        )
        return datum.beneficiary === beneficiaryPublicKeyHash && datum.lock_until <= currentTime
    })
    const tx: TxComplete = await lucid
        .newTx()
        .collectFrom(utxos, redeemer)
        .attachSpendingValidator(validator)
        .addSigner(await lucid.wallet.address())   // cận dưới                cận trên
        .validFrom(currentTime)
        .validTo(laterTime)
        .complete()
    const signedTx: TxSigned = await tx
        .sign()
        .complete()
    
    const txHash: TxHash = await signedTx.submit(); 
    await lucid.awaitTx(txHash)
    return txHash
}

export default vestingUnLock