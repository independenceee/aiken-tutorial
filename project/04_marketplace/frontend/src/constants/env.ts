import * as dotenv from "dotenv";
dotenv.config();

export const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS as string;
export const ADDRESS_DONATE: string = process.env.ADDRESS_DONATE as string;

export const BLOCKFROST_RPC_URL_MAINNET: string = process.env
    .BLOCKFROST_RPC_URL_MAINNET as string;
export const BLOCKFROST_RPC_URL_PREPROD: string = process.env
    .BLOCKFROST_RPC_URL_PREPROD as string;
export const BLOCKFROST_RPC_URL_PREVIEW: string = process.env
    .BLOCKFROST_RPC_URL_PREVIEW as string;

export const BLOCKFROST_PROJECT_API_KEY_MAINNET: string = process.env
    .BLOCKFROST_PROJECT_API_KEY_MAINNET as string;
export const BLOCKFROST_PROJECT_API_KEY_PREPROD: string = process.env
    .BLOCKFROST_PROJECT_API_KEY_PREPROD as string;
export const BLOCKFROST_PROJECT_API_KEY_PREVIEW: string = process.env
    .BLOCKFROST_PROJECT_API_KEY_PREVIEW as string;

export const BLOCKFROST_NETWORK_NAME_PREPROD: string = process.env
    .BLOCKFROST_NETWORK_NAME_PREPROD as string;
export const BLOCKFROST_NETWORK_NAME_PREVIEW: string = process.env
    .BLOCKFROST_NETWORK_NAME_PREVIEW as string;
export const BLOCKFROST_NETWORK_NAME_MAINNET: string = process.env
    .BLOCKFROST_NETWORK_NAME_MAINNET as string;
