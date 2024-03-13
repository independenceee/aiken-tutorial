import { Data, Script, Lucid, TxHash, TxSigned, UTxO } from "lucid-cardano";
import { MarketplaceDatum } from "~/constants/datum"
import { MarketplaceRedeemer } from "~/constants/redeemer";
import readValidator from "~/utils/read-validator";

type Props = {
    lucid: Lucid;
    assets: any[]
}

const buyAssets = async function ({ lucid, assets }: Props): Promise<TxHash>  {
    

    const validator: Script = readValidator();
    const contractAddress: string = lucid.utils.validatorToAddress(validator)

    const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress);

    const utxosOuts = assets.filter(function (asset: any) {
        scriptUtxos.forEach(function (scriptUtxo) {
            const {assetName, policyId} = Data.from(scriptUtxo.datum!, MarketplaceDatum)

            if (policyId === asset.policyId && assetName === asset.assetName) {
                return scriptUtxo
             }
        })
    })
    
    

    let tx: any =  lucid.newTx()
       
    utxosOuts.forEach(async function (utxosOut, index) {
        const exchangeFee = BigInt((parseInt(utxosOut.price) * 1) / 100)
        tx = tx
                .payToAddress(utxosOut.sellerAddress as string, {
                    lovelace: utxosOut.price as bigint,
                })
            .payToAddress(process.env.ADDRESS_EXCHANGE_FEE as string, {
                lovelace: exchangeFee as bigint
            },
                )
                .payToAddress(utxosOut.authorAddress as string, {
                    lovelace: utxosOut.royalties as bigint,
                });
    })
        
    tx = await tx
        .collectFrom(utxosOuts, MarketplaceRedeemer)
        .attachSpendingValidator(validator)
        .complete()
    
    
    const signedTx: TxSigned = await tx.sign().complete();
    const txHash: TxHash = await signedTx.submit()
    return txHash
}   


export default buyAssets;