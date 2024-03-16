import { C, toHex } from "lucid-cardano";

const fetchPublicKeyFromAddress = function (address: string) {
    const publicKey = C.BaseAddress.from_address(C.Address.from_bech32(address))?.payment_cred().to_keyhash();
    return toHex(publicKey?.to_bytes()!);
};

export default fetchPublicKeyFromAddress;
