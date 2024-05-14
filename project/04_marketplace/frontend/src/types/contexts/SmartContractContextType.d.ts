export type SmartContractContextType = {
    sell: ({
        policyId,
        assetName,
        authorAddress,
        price,
        royalties,
        lucid,
    }: {
        policyId: string;
        assetName: string;
        authorAddress: string;
        price: bigint;
        royalties: bigint;
        lucid: Lucid;
    }) => Promise<void>;

    mint: ({
        lucid,
        title,
        description,
        image,
        mediaType,
        metadata,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        mediaType: string;
        url: string;
        metadata: any;
    }) => Promise<any>;

    collection: ({
        lucid,
        title,
        description,
        avatar,
        cover,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        avatar: string;
        cover: string;
    }) => Promise<void>;
    buy: ({ lucid, products }: { lucid: Lucid; products: ProductType[] }) => Promise<void>;
    refund: ({ lucid, policyId, assetName }: { lucid: Lucid; policyId: PolicyId; assetName: string }) => Promise<void>;
    burn: ({ lucid, policyId, assetName }: { lucid: Lucid; policyId: string; assetName: string }) => Promise<void>;
};
