import lucidService from "./lucid-service";

import { Data, Script, UTxO } from "lucid-cardano";
import { contractValidatorMarketplace } from "@/libs/marketplace";
import readValidator from "@/utils/read-validator";
import { Datum } from "@/constants/datum";

type Props = {
    policyId: string;
    assetName: string;
};

const findAssetService = async function ({ policyId, assetName }: Props) {
    let existAsset: any;
    const lucid = await lucidService();
    const validator: Script = await readValidator({
        compliedCode: contractValidatorMarketplace[0].compiledCode,
    });
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress);
    const utxos: UTxO[] = scriptUtxos.filter((utxo: any, index: number) => {
        const checkAsset: Datum = Data.from<Datum>(utxo.datum, Datum);
        if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
            existAsset = Data.from<Datum>(utxo.datum, Datum);
            return true;
        }
        return false;
    });

    if (utxos.length === 0) {
        console.log("utxo found");
        return null;
    }

    return existAsset;
};

export default findAssetService;
