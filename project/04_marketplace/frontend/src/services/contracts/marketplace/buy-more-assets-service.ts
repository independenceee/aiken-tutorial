import { Lucid, Script, UTxO, Data, TxComplete, Tx } from "lucid-cardano";
import readValidator from "@/utils/read-validator";
import { NftItemType } from "@/types/GenericsType";
import { contractValidatorMarketplace } from "@/libs/marketplace";
import { Datum } from "@/constants/datum";
import { redeemer } from "@/constants/redeemer";
type Props = {
    lucid: Lucid;
    assets: NftItemType[];
};

const buyMoreAssetsService = async function ({ lucid, assets }: Props): Promise<string | any> {
    try {
        const validator: Script = await readValidator({
            compliedCode: contractValidatorMarketplace[0].compiledCode,
        });

        const contractAddress: string = lucid.utils.validatorToAddress(validator);
        const scriptUtxos: UTxO[] | any = await lucid.utxosAt(contractAddress);

        let utxos = [];
        for (let i = 0; i < assets.length; i++) {
            for (let u = 0; u < scriptUtxos.length; u++) {
                const temp = Data.from<Datum>(scriptUtxos[u].datum, Datum);
                if (
                    temp.policyId === assets[i].policyId &&
                    temp.assetName === assets[i].assetName
                ) {
                    utxos.push(scriptUtxos[u]);
                }
            }
        }

        const utxoOuts: any = utxos.map(function (utxo: any) {
            return Data.from<Datum>(utxo.datum, Datum);
        });

        let tx: any = await lucid.newTx();

        for (let i = 0; i < utxos.length; i++) {
            let exchange_fee = BigInt((parseInt(utxoOuts[i].price) * 1) / 100);
            tx = await tx
                .payToAddress(String(assets[i].sellerAddress), {
                    lovelace: utxoOuts[i].price as bigint,
                })
                .payToAddress(
                    "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
                    { lovelace: exchange_fee as bigint },
                )
                .payToAddress(String(assets[i].authorAddress), {
                    lovelace: utxoOuts[i].royalties as bigint,
                });
        }

        // utxos.forEach(async function (asset: NftItemType, index: number) {
        //     const exchangeFee = BigInt((Number(utxoOuts[index].price) * 1) / 100);
        //     tx = await tx
        //         .payToAddress(asset.sellerAddress as string, {
        //             lovelace: utxoOuts[index].price as bigint,
        //         })
        //         .payToAddress(
        //             "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg" as string,
        //             { lovelace: exchangeFee as bigint },
        //         )
        //         .payToAddress(asset.authorAddress as string, {
        //             lovelace: utxoOuts[index].royalties as bigint,
        //         });
        // });

        tx = await tx.collectFrom(utxos, redeemer).attachSpendingValidator(validator).complete();
        const signedTx = await tx.sign().complete();

        const txHash: string = await signedTx.submit();
        await lucid.awaitTx(txHash);
        return txHash;
    } catch (error) {
        console.log(error);
    }
};

export default buyMoreAssetsService;
