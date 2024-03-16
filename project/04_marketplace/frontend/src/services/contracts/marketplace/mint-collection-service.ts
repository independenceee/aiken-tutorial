import { Lucid, TxComplete, TxSigned } from "lucid-cardano";
import mintingPolicyId from "@/utils/minting-policyid";

type Props = {
    lucid: Lucid;
    title: string;
    description: string;
    imageAvatar: string;
    imageCover: string;
};

const mintCollection = async function ({
    lucid,
    title,
    description,
    imageAvatar,
    imageCover,
}: Props) {
    try {
        const { mintingPolicy, policyId } = await mintingPolicyId({ lucid: lucid });
        const tx: TxComplete = await lucid
            .newTx()
            .mintAssets({ [policyId]: BigInt(1) })
            .attachMetadata(721, {
                [policyId]: {
                    [""]: {
                        avatar: imageAvatar,
                        cover: imageCover,
                        title: title,
                        description: description,
                    },
                },
            })
            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy)
            .complete();
        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: string = await signedTx.submit();
        await lucid.awaitTx(txHash);
        return { policyId, txHash };
    } catch (error) {
        console.log(error);
    }
};

export default mintCollection;
