import { encode } from "cbor-x";
import { SpendingValidator, fromHex, toHex } from "lucid-cardano";
import helloworld from "~/libs/plutus.json";



const readValidator = function (): SpendingValidator {
    
    // TÌm validator của hợp đồng thông minh helloworld
    const helloworldValidator = helloworld.validators.find(function (validator) {
        return validator.title === "contract.hello_world"
    })

    if (!helloworldValidator) {
        throw new Error("Hello world validator is not found");
    }

    // Encode compile code của validator

    const helloworldScript = toHex(encode(fromHex(helloworldValidator.compiledCode)));

    return {
        type: "PlutusV2",
        script: helloworldScript
    }
}

export default readValidator;