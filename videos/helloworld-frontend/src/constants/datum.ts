import { Data } from "lucid-cardano";

const HelloworldDatumSchema = Data.Object({
    owner: Data.Bytes()
})

type HelloworldDatum = Data.Static<typeof HelloworldDatumSchema>
export const HelloworldDatum = HelloworldDatumSchema as unknown as HelloworldDatum