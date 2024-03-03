import {
  applyDoubleCborEncoding,
  applyParamsToScript,
  Constr,
  fromText,
  Lucid,
  MintingPolicy,
  OutRef,
  SpendingValidator,
} from "lucid-cardano";
import { Validators } from "./read-validators";

 
export type AppliedValidators = {
    redeem: SpendingValidator;
    giftCard: MintingPolicy;
    policyId: string;
    lockAddress: string;
};
 
export function applyParams(
    tokenName: string,
    outputReference: OutRef,
    validators: Validators,
    lucid: Lucid
): AppliedValidators {
    const outRef = new Constr(0, [
        new Constr(0, [outputReference.txHash]),
        BigInt(outputReference.outputIndex),
    ]);
    
    const giftCard = applyParamsToScript(validators.giftCard.script, [
        fromText(tokenName),
        outRef,
    ]);
    
    const policyId = lucid.utils.validatorToScriptHash({
        type: "PlutusV2",
        script: giftCard,
    });
    
    const redeem = applyParamsToScript(validators.redeem.script, [
        fromText(tokenName),
        policyId,
    ]);
    
    const lockAddress = lucid.utils.validatorToAddress({
        type: "PlutusV2",
        script: redeem,
    });
    
    return {
        redeem: { type: "PlutusV2", script: applyDoubleCborEncoding(redeem) },
        giftCard: { type: "PlutusV2", script: applyDoubleCborEncoding(giftCard) },
        policyId,
        lockAddress,
    };
}