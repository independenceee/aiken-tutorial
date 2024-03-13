import { Lucid, Script, UTxO, Data, TxComplete, Tx, TxHash } from "lucid-cardano";
import readValidator from "~/utils/read-validator";
import { MarketplaceDatum } from "~/constants/datum";


type Props = {
    lucid: Lucid;
    assets: any[];
};

const sellAssets = async function ({ lucid, assets }: Props): Promise<TxHash> {
    const validator: Script =  readValidator();
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const sellerPublicKey: string = lucid.utils.getAddressDetails(await lucid.wallet.address())
        .paymentCredential?.hash as string;
    const authorPublicKey = "";



    const datums = assets.map(function ({ policyId,  assetName, sellerPublicKey,authorPublicKey, price, royalties }) {
        return Data.to(
            {
                assetName: assetName,
                policyId: policyId,
                author: authorPublicKey,
                price: BigInt(price),
                royalties: BigInt(royalties),
                seller: sellerPublicKey
            },
            MarketplaceDatum
        )
    })

    let tx: any =  lucid.newTx();
    
    datums.forEach(function (datum: any) {
        tx = tx.payToContract(contractAddress, {
            inline: datum
        }, {
            [(datum.policyId  + datum.assetName)]: BigInt(1)
        })
    })
    tx = await tx.complete()
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash
};

export default sellAssets;