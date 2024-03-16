const convertIpfsAddressToUrl = function (ipfsAddress = "ipfs://QmTcV2Vr9ghyBq458cx8Us2jvgPvWwfUWYWUU3rCCcfNYC") {
    if (ipfsAddress.startsWith("ipfs://")) {
        const ipfsHash = ipfsAddress.slice("ipfs://".length);
        const ipfsURL = `https://ipfs.io/ipfs/${ipfsHash}`;
        return ipfsURL;
    } else {
        return null;
    }
};
export default convertIpfsAddressToUrl;
