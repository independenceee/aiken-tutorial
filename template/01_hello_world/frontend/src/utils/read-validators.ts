import { encode } from "cbor-x"
import { SpendingValidator, fromHex, toHex } from "lucid-cardano"
import helloWorld from "~/libs/helloworld.json" 

const readValidator = function(): SpendingValidator {
    // TODO: Read validator
}

export default readValidator