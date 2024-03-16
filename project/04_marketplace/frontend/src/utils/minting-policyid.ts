import { Lucid, Script } from "lucid-cardano";

type Props = {
    lucid: Lucid;
};

const mintingPolicyId = async function ({
    lucid,
}: Props): Promise<{ policyId: string; mintingPolicy: Script }> {
    const { paymentCredential }: any = lucid.utils.getAddressDetails(await lucid.wallet.address());

    const mintingPolicy: Script = lucid.utils.nativeScriptFromJson({
        type: "all",
        scripts: [
            { type: "sig", keyHash: paymentCredential.hash },
            { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
        ],
    });
    const policyId: string = lucid.utils.mintingPolicyToId(mintingPolicy);

    return {
        policyId: policyId,
        mintingPolicy: mintingPolicy,
    };
};

export default mintingPolicyId;
