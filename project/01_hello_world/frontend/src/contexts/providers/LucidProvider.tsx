"use client";

import React, { ReactNode, useState } from "react";
import { Lucid, fromText, Script } from "lucid-cardano";
import LucidContext from "~/contexts/components/LucidContext";

type Props = {
    children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>(null!);

    const mint = async function () {
        console.log("Mint");
        const { paymentCredential }: any = lucid.utils.getAddressDetails(
            await lucid.wallet.address()
        );
        const mintingPolicy: Script = lucid.utils.nativeScriptFromJson({
            type: "all",
            scripts: [
                { type: "sig", keyHash: paymentCredential.hash },
                {
                    type: "before",
                    slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
                },
            ],
        });
        const policyId: string = lucid.utils.mintingPolicyToId(mintingPolicy);
        const unit = policyId + fromText("HCM-WG");
        const filename =
            "ipfs://QmRjbyZTw1bo2wVorHNMFosKKKwjxMLHVcRgH4qVXPKisy";
        //ipfs://QmRjbyZTw1bo2wVorHNMFosKKKwjxMLHVcRgH4qVXPKisy"

        const metadata = {
            [policyId]: {
                ["HCM-WG"]: {
                    mediaType: "image/jpeg",
                    description: "Token for HCM",
                    // id: "1",
                    image: filename,
                    name: "Ho Chi Minh Working Group",
                },
            },
        };
        console.log(metadata);
        const tx = await lucid
            .newTx()
            .mintAssets({ [unit]: BigInt(1) }) //tên và số lượng
            .attachMetadata(721, metadata) //attachMetadata
            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy)
            .complete();
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        console.log(`ID giao dịch là ${txHash}`);
    };
    return (
        <LucidContext.Provider
            value={{
                lucid,
                setLucid,
                mint,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
