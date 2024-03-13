import { encode } from "cbor-x";
import { MintingPolicy, SpendingValidator, fromHex, toHex } from "lucid-cardano";
import giftcard from "~/libs/plutus.json";


export type Validators = {
    redeem: SpendingValidator,
    giftCard: MintingPolicy
}

const readValidators = function (): Validators {

    const redeemValidator = giftcard.validators.find(function (validator) {
        return validator.title === "contract.redeem"
    })

    const giftCardValidator = giftcard.validators.find(function (validator) {
        return validator.title === "contract.gift_card"
    });

    if (!giftCardValidator) {
        throw new Error("Validator gift card not found.")
    }

    if (!redeemValidator) {
        throw new Error("Validator redeem not found.")
    }

    const redeemScript: string  = toHex(encode(fromHex(redeemValidator.compiledCode)))

    return {
        redeem: {
            type: "PlutusV2",
            script: redeemScript,
        },
        giftCard: {
            type: "PlutusV2",
            script: giftCardValidator.compiledCode
        }
    }
}

export default readValidators