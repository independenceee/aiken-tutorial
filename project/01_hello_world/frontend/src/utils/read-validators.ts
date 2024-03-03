import { encode } from "cbor-x"
import { SpendingValidator, fromHex, toHex } from "lucid-cardano"
import helloWorld from "~/libs/helloworld.json" 

const readValidator = function(): SpendingValidator {
    const helloWorldValidator = helloWorld.validators.find(function(validator) {
        return validator.title === "contract.hello_world"
    })
    if(!helloWorldValidator) {
        throw new Error("Hello world validator not found.")
    }
    const helloWorldScript: string = toHex(encode(fromHex(helloWorldValidator.compiledCode)))

    return {
        type: "PlutusV2",
        script: helloWorldScript,
    }
}

export default readValidator