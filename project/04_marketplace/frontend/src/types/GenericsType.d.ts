export type WalletType = {
    name: string;
    image: string;
    balance?: number;
    address?: string;
    stakeKey?: string;
    downloadApi?: string;
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type NetworkType = {
    networkName: Network;
    url: string;
    apiKey: string;
};

export type AccountType = {
    id?: string;
    created_at?: string;
    updated_at?: string;
    wallet_address?: string;
    stake_address?: string;
    username?: string;
    description?: string;
    avatar?: string;
    email?: string;
    telegram?: string;
    linkedin?: string;
    twitter?: string;
};

export type ProductType = {
    policyId: string;
    assetName: string;

    price: number;
    avatar: string;

    metadata?: any;
    sellerAddress?: string;
    currentAddress?: string;
    authorAddress?: string;

    image?: string;
    type?: string;
};

export type TransactionHistoryType = {
    address: string;
    txHash: string;
    date: number;
    status: string;
    price: string;
};

export type HeaderTableType = {
    title: string;
    description?: string;
};

export type CategoryItemType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    slug?: string;
};

export type TransactionResponseType = {
    totalPage: number;
    histories: TransactionHistoryType[];
    totalItems: number;
};
