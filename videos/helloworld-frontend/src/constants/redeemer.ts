import { Data } from "lucid-cardano";


const HelloworldRedeemerSchema = Data.Object({
    msg: Data.Bytes()
})

type HelloworldRedeemer = Data.Static<typeof HelloworldRedeemerSchema>
export const HelloworldRedeemer = HelloworldRedeemerSchema as unknown as HelloworldRedeemer