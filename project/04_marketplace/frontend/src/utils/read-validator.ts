import { encode } from "cbor-x";
import { SpendingValidator, fromHex, toHex } from "lucid-cardano";

type Props = {
    compliedCode: string;
};

const readValidator = async function ({ compliedCode }: Props): Promise<SpendingValidator> {
    const script: string = toHex(encode(fromHex(compliedCode)));

    return {
        type: "PlutusV2",
        script: script,
    };
};

export default readValidator;
