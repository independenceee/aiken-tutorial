import { Lucid, Script, TxHash, Data, TxComplete, TxSigned} from "lucid-cardano"
import { HelloWorldDatum } from "~/constants/datum"
import readValidator from "~/utils/read-validators"


type Props = {
    lovelace: bigint
    lucid: Lucid,
}

const lockHelloWorld = async function ({ lucid, lovelace }: Props): Promise<TxHash> {
    // TODO: Function Lock Ada to Contract
}

export default lockHelloWorld;