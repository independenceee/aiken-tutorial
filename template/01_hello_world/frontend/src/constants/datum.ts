import { Data } from "lucid-cardano";

const HelloWorldDatumSchema = Data.Object({
    owner: Data.Bytes(),
})

type HelloWorldDatum = Data.Static<typeof HelloWorldDatumSchema>
export const HelloWorldDatum = HelloWorldDatumSchema as unknown as HelloWorldDatum
