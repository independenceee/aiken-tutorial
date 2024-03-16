import mintingPolicyId from "@/utils/minting-policyid";
import { Lucid, fromText } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    title: string;
    description: string;
    mediaType: string;
    imageUrl: string;
    customMetadata: any;
};

const mintAssetService = async function ({
    lucid,
    title,
    description,
    imageUrl,
    mediaType,
    customMetadata,
}: Props): Promise<any> {
    try {
        const { mintingPolicy, policyId } = await mintingPolicyId({ lucid: lucid });
        const assetName = fromText(title);
        const cleanedData = Object.fromEntries(
            Object.entries(customMetadata).filter(([key, value]) => key !== ""),
        );
        const tx = await lucid
            .newTx()
            .mintAssets({ [policyId + assetName]: BigInt(1) })
            .attachMetadata(721, {
                [policyId]: {
                    [title]: {
                        name: title,
                        description: description,
                        image: imageUrl,
                        mediaType: mediaType,
                        ...cleanedData,
                    },
                },
            })
            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy)
            .complete();
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        await lucid.awaitTx(txHash);
        return { txHash, policyId, assetName };
    } catch (error) {
        console.log(error);
    }
};

export default mintAssetService;
