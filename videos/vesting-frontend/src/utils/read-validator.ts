import { encode } from "cbor-x";
import { SpendingValidator, fromHex, toHex } from "lucid-cardano";

import vesting from "~/libs/plutus.json"

const readValidator = function (): SpendingValidator {
    // Tim kiem validator 
    const vestingValidator = vesting.validators.find(function (validator) {
        return validator.title === "contract.vesting"
    })

    if (!vestingValidator) {
        throw new Error("Vesting validator not found !")
    }

    // Encode validator

    const vestingScript = toHex(encode(fromHex(vestingValidator.compiledCode)));

    return {
        type: "PlutusV2",
        script: vestingScript,
    }
}
export default readValidator