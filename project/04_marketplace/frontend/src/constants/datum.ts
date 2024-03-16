import { Data } from "lucid-cardano";

const DatumInitial = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    seller: Data.Bytes(),
    author: Data.Bytes(),
    price: Data.Integer(),
    royalties: Data.Integer(),
});

export type Datum = Data.Static<typeof DatumInitial>;
export const Datum = DatumInitial as unknown as Datum;
