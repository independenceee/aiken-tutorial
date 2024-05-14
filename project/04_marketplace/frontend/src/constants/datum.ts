import { Data } from "lucid-cardano";

const MarketplaceDatumSchema = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    seller: Data.Bytes(),
    author: Data.Bytes(),
    price: Data.Integer(),
    royalties: Data.Integer(),
});

export type MarketplaceDatum = Data.Static<typeof MarketplaceDatumSchema>;
export const MarketplaceDatum = MarketplaceDatumSchema as unknown as MarketplaceDatum;
