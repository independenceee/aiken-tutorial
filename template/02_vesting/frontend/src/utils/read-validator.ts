import { SpendingValidator, fromHex, toHex } from "lucid-cardano"
import { encode } from "cbor-x"
import vesting from "~/libs/plutus.json"

const readValidator = function (): SpendingValidator {
    const vestingValidator = vesting.validators.find(function(validator) {
        return validator.title === "contract.vesting"
    })

    if(!vestingValidator) {
        throw new Error("Hello world validator not found.")
    }

    const vestingScript: string = toHex(encode(fromHex(vestingValidator.compiledCode)))

    return {
        type: "PlutusV2",
        script: vestingScript,
    }
}

export default readValidator