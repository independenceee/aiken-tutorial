import { encode } from "cbor-x";
import { SpendingValidator, fromHex, toHex } from "lucid-cardano";
import marketplace from "../libs/plutus.json";

const readValidator = function (): SpendingValidator {
    const marketplaceValidator = marketplace.validators.find(function (validator) {
        return validator.title === "contract.contract";
    });

    if (!marketplaceValidator) {
        throw new Error("Marketplace validator not found");
    }

    const marketplaceScript = toHex(encode(fromHex(marketplaceValidator.compiledCode)));

    return {
        type: "PlutusV2",
        script: marketplaceScript,
    };
};

export default readValidator;