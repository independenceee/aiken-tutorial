import { Blockfrost, Lucid } from "lucid-cardano";

const lucidService = async function (): Promise<Lucid> {
    const lucid = await Lucid.new(
        new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD as string, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD as string),
        "Preprod",
    );

    return lucid;
};

export default lucidService;
