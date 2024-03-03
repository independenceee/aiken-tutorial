import { Lucid, Script, TxHash, Data, TxComplete, TxSigned} from "lucid-cardano"
import { HelloWorldDatum } from "~/constants/datum"
import readValidator from "~/utils/read-validators"


type Props = {
    lovelace: bigint
    lucid: Lucid,
}

const lockHelloWorld = async function ({ lucid, lovelace }: Props): Promise<TxHash> {
    
    const ownerPublicKeyHash = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash!;

    const datum = Data.to({
            owner: ownerPublicKeyHash
        },
        HelloWorldDatum
    )
    
    const validator: Script = readValidator()
    const contractAddress = lucid.utils.validatorToAddress(validator)

    const tx: TxComplete = await lucid
        .newTx()
        .payToContract(contractAddress, 
            { inline: datum }, 
            { lovelace: lovelace }
        )
        .complete()
    
    const signedTx: TxSigned = await tx.sign().complete()
    const txHash: TxHash = await signedTx.submit();
    await lucid.awaitTx(txHash);
    return txHash;
}

export default lockHelloWorld;