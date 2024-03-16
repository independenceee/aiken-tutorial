import { post } from "@/utils/http-request";

type Props = {
    policyId: string;
    assetName: string;
};

const fetchAddressFromTxHash = async function (transactionHash: string) {
    const data = await post("/blockfrost/transaction/utxos", { transactionHash: transactionHash });
    return data.inputs[0].address;
};

const fetchAddress = async function ({ policyId, assetName }: Props) {
    const data = await post("/blockfrost/transaction/asset", {
        policyId: policyId,
        assetName: assetName,
    });
    const address = await fetchAddressFromTxHash(data.firstTransaction.tx_hash);

    return { createdAt: data.firstTransaction.block_time, address: address };
};

const fetchInfomationCollection = async function ({ policyId, assetName }: Props) {
    try {
        const metadata = await post("/blockfrost/assets/information", {
            policyId: policyId,
            assetName: assetName,
        });
        const { createdAt, address } = await fetchAddress({
            policyId: policyId,
            assetName: assetName,
        });
        return { ...metadata.onchain_metadata, policyId, address, createdAt };
    } catch (error) {
        console.log(error);
    }
};

export default fetchInfomationCollection;
