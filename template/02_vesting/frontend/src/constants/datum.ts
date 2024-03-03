import { Data } from "lucid-cardano";

const VestingDatumSchema = Data.Object({
    lock_until: Data.Integer(),
    owner: Data.Bytes(),
    beneficiary: Data.Bytes(),
})

type VestingDatum = Data.Static<typeof VestingDatumSchema>
export const VestingDatum = VestingDatumSchema as unknown as VestingDatum

