import { Constr, Data, Lucid, Redeemer, Script, TxComplete, TxHash, TxSigned, UTxO, fromText } from "lucid-cardano"
import { HelloWorldRedeemer } from "~/constants/redeemer";
import readValidator from "~/utils/read-validators";

type Props = {
    lucid: Lucid,
}


const unLockHelloWorld = async function({ lucid }: Props): Promise<TxHash> {
    // TODO: Function Un Lock Ada to Contract
}

export default unLockHelloWorld