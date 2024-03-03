import { Data } from "lucid-cardano";

const HelloWorldRedeemerSchema = Data.Object({
    msg: Data.Bytes(),
})

type HelloWorldRedeemer = Data.Static<typeof HelloWorldRedeemerSchema>
export const HelloWorldRedeemer = HelloWorldRedeemerSchema as unknown as HelloWorldRedeemer