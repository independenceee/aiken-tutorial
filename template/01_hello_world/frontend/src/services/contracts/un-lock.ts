import { Constr, Data, Lucid, Redeemer, Script, TxComplete, TxHash, TxSigned, UTxO, fromText } from "lucid-cardano"
import { HelloWorldRedeemer } from "~/constants/redeemer";
import readValidator from "~/utils/read-validators";

type Props = {
    lucid: Lucid,
}


const unLockHelloWorld = async function({ lucid }: Props): Promise<TxHash> {

    const redeemer =  Data.to({ msg: fromText("Hello, World!") }, HelloWorldRedeemer); 
    const validator: Script =  readValidator();
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress)

    const tx: TxComplete = await lucid
        .newTx()
        .collectFrom(scriptUtxos, redeemer)
        .attachSpendingValidator(validator)
        .addSigner(await lucid.wallet.address())
        .complete();
    
    const signedTx: TxSigned = await tx
        .sign()
        .complete();
    
    const txHash: TxHash = await signedTx.submit();
    await lucid.awaitTx(txHash);
    return txHash;
}

export default unLockHelloWorld