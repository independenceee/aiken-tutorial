import { Lucid, Script, UTxO, Data, TxComplete } from "lucid-cardano";
import readValidator from "@/utils/read-validator";
import { NftItemType } from "@/types/GenericsType";
import { contractValidatorMarketplace } from "@/libs/marketplace";
import { Datum } from "@/constants/datum";
import { redeemer } from "@/constants/redeemer";
type Props = {
    lucid: Lucid;
    assets: NftItemType[];
};

const sellMoreAssetsService = async function ({ lucid, assets }: Props) {
    try {
        const validator: Script = await readValidator({
            compliedCode: contractValidatorMarketplace[0].compiledCode,
        });

        const contractAddress: string = lucid.utils.validatorToAddress(validator);
        const scriptUtxos: UTxO[] | any = await lucid.utxosAt(contractAddress);

        const utxos = assets.filter(function (asset: NftItemType, index: number) {
            scriptUtxos.forEach(function (scriptUtxo: any, index: number) {
                const temp = Data.from<Datum>(scriptUtxo.datum, Datum);
                if (temp.policyId === asset.policyId && temp.assetName === asset.assetName) {
                    return scriptUtxo;
                }
            });
        });

        const utxoOuts: any = utxos.map(function (utxo: any) {
            return Data.from<Datum>(utxo.datum, Datum);
        });

        let tx: any = lucid.newTx();

        utxos.forEach(async function (utxo, index: number) {
            const exchangeFee = BigInt((parseInt(utxoOuts[index].price) * 1) / 100);
            tx = tx
                .payToAddress(utxo.sellerAddress as string, {
                    lovelace: utxo.price as bigint,
                })
                .payToAddress(
                    "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg" as string,
                    { lovelace: exchangeFee as bigint },
                )
                .payToAddress(utxo.authorAddress as string, {
                    lovelace: utxo.royalties as bigint,
                });
        });

        tx = await tx.collectFrom(utxoOuts, redeemer).attachSpendingValidator(validator).complete();
        const signedTx = await tx.sign().complete();

        const txHash: string = await signedTx.submit();
        await lucid.awaitTx(txHash);
        return txHash;
    } catch (error) {
        console.log(error);
    }
};

export default sellMoreAssetsService;
