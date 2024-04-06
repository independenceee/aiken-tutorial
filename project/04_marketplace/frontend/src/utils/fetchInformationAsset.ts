import { post, get } from "../utils/http-request";
import axios from "axios";

type Props = {
    policyId: string;
    assetName: string;
};

const fetchCurrentAddressAsset = async function ({ policyId, assetName }: { policyId: string; assetName: string }) {
    try {
        // const data = await post("/koios/assets/nft-address", {
        //     policyId: policyId,
        //     assetName: assetName,
        // });
        // return data.address;
    } catch (error) {
        console.error(error);
    }
};

const fetchAddressFromTxHash = async function (transactionHash: string) {
    const data = await post("/blockfrost/transaction/utxos", { transactionHash: transactionHash });
    return data.inputs[0].address;
};

const fetchStakeKeyFromAddress = async function (address: string) {
    try {
        const data = await post("/emurgo/stakekey/address", { address: address });
        return data.stakeKey;
    } catch (error) {
        console.error(error);
    }
};

const fetchAuthorAddressAndSellerAddress = async function ({ policyId, assetName }: Props) {
    const data = await post("/blockfrost/transaction/asset", {
        policyId: policyId,
        assetName: assetName,
    });
    const authorAddress = await fetchAddressFromTxHash(data.firstTransaction.tx_hash);
    const sellerAddress = await fetchAddressFromTxHash(data.currentTransaction.tx_hash);
    const stakekeyAuthorAddress = await fetchStakeKeyFromAddress(authorAddress);
    const stakekeySellerAddress = await fetchStakeKeyFromAddress(sellerAddress);

    return { authorAddress, sellerAddress, stakekeyAuthorAddress, stakekeySellerAddress };
};

const fetchMetadataFromPolicyIdAndAssetName = async function ({ policyId, assetName }: Props) {
    const metadata = await post("/blockfrost/assets/information", {
        policyId: policyId,
        assetName: assetName,
    });
    return { fingerprint: metadata.fingerprint, metadata: metadata.onchain_metadata };
};

const fetchInformationAsset = async function ({ policyId, assetName }: Props) {
    const currentAddress = await fetchCurrentAddressAsset({ policyId, assetName });
    const { authorAddress, sellerAddress, stakekeyAuthorAddress, stakekeySellerAddress } = await fetchAuthorAddressAndSellerAddress({
        policyId,
        assetName,
    });
    const { fingerprint, metadata } = await fetchMetadataFromPolicyIdAndAssetName({
        policyId,
        assetName,
    });

    const sellerAccount = await post("/account", {
        walletAddress: sellerAddress,
    });

    // const response = await fetch(`https://preprod.koios.rest/api/v1/asset_nft_address?_asset_policy=${policyId}&_asset_name=${assetName}`);
    // const data = await response.json();
    // console.log(data);

    return {
        policyId,
        assetName,
        currentAddress,
        authorAddress,
        sellerAddress,
        stakekeyAuthorAddress,
        stakekeySellerAddress,
        fingerprint,
        ...metadata,

        sellerAccount: sellerAccount,
    };
};

export default fetchInformationAsset;