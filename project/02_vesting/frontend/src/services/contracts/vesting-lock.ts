import { Data, Lucid, TxComplete, TxHash, TxSigned } from "lucid-cardano";
import { VestingDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validator";


type Props = {
    lucid: Lucid;
    lockUntil: bigint;
    lovelace: bigint;
}

const vestingLock = async function ({ lucid, lockUntil, lovelace }: Props): Promise<TxHash> {
    const ownerPublicKeyHash: string = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash as string;

    const beneficiaryPublicKeyHash: string = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash as string;

    const datum = Data.to(
        {
            beneficiary: beneficiaryPublicKeyHash,
            owner: ownerPublicKeyHash,
            lock_until: lockUntil,
        },
        VestingDatum
    );

    const validator = readValidator()
    const contractAddress: string = lucid.utils.validatorToAddress(validator)
    const tx: TxComplete = await lucid
        .newTx()
        .payToContract(contractAddress, { inline: datum }, { lovelace: lovelace })
        .complete()

    const signedTx: TxSigned = await tx.sign().complete();
    const txHash: TxHash = await signedTx.submit();
    lucid.awaitTx(txHash);

    console.log(txHash)
    return txHash
}


export default vestingLock;