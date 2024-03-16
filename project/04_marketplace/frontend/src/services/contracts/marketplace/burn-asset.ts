import { Lucid, fromText } from "lucid-cardano";
import mintingPolicyId from "@/utils/minting-policyid";

type Props = {
    lucid: Lucid;
    policyId: string;
    assetName: string;
};

const burnAsset = async function ({ lucid, policyId, assetName }: Props) {
    try {
        const { mintingPolicy, policyId } = await mintingPolicyId({ lucid: lucid });

        const unit = policyId + fromText(assetName);
        const tx = await lucid
            .newTx()
            .mintAssets({ [unit]: BigInt(-1) })
            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy)
            .complete();
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();

        return { txHash, policyId, assetName };
    } catch (error) {
        console.error(error);
    }
};

export default burnAsset;
