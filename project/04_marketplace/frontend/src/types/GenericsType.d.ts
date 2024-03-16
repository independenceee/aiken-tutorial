export type NftItemType = {
    assetName: string;
    authorAddress?: string;
    currentAddress?: string;
    description?: string;
    fingerprint?: string;
    image?: string;
    mediaType?: string;
    name?: string | any;
    policyId: string;
    sellerAddress?: string;
    stakekeyAuthorAddress?: string;
    stakekeySellerAddress?: string;
    price?: bigint;
    royalties?: bigint;
    id?: string;
    countOfTransaction?: number;
    createdAt?: string;
    status?: string;
    updatedAt?: string;
    validate?: boolean;
    collection?: string;

    authorAccount?: AccountItemType;
    currentAccount?: AccountItemType;
    sellerAccount?: AccountItemType;
};

export type CollectionItemType = {
    policyId: string;
    cover: string;
    avatar: string;
    title: string;
    description: string;
    address: string;
    totalAsset: number;
    createdAt: string;
};

export type AccountItemType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    walletAddress: string;
    stakeKey: null;
    email: string;
    userName: string;
    description: string;
    rating: string;
    cover: string;
    avatar: string;
    telegram: string;
    linkedin: string;
    twitter: string;
    followed?: number;
    validate: false;
};

export type WalletItemType = {
    walletBalance?: number;
    walletName: string;
    walletImage: string;
    walletAddress?: string;
    walletDownloadApi?: string;
    walletApi: () => Promise<any> | any;
    walletCheckApi: () => Promise<any> | any;
};

export type Statistic = {
    totalTransaction: number;
    totalProduct: number;
    totalTrending: number;
    totalAccount: number;
};

export type FounderItemType = {
    avatar: string;
    company: string;
    createdAt?: string;
    firstName: string;
    id?: string;
    lastName: string;
    role: string;
    twitter: string;
    linkedin: string;
    updatedAt?: string;
};

export type CategoryItemType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    slug?: string;
};

export type HistoryItemType = {
    hash: string;
    address: string;
    status: string;
    price: number;
    dateTime: string;
};

export type QueryParamsType = {
    sortby?: string;
    verify?: string;
    category?: string;
    search?: string;
};

export type RevalidateType = {
    following: boolean;
    follower: boolean;
    account: boolean;
};
