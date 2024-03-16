"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "@/contexts/components/LucidContext";

type Props = { children: ReactNode };

const LucidProvider = function ({ children }: Props) {
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [lucidNeworkPlatform, setLucidNeworkPlatform] = useState<Lucid>(null!);

    useEffect(() => {
        const chooseLucidNetworkPlatform = async function () {
            let lucid: Lucid;
            lucid = await Lucid.new(
                new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD as string, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD as string),
                "Preprod",
            );
            setLucidNeworkPlatform(lucid);
        };

        chooseLucidNetworkPlatform();

        // react-hooks/exhaustive-deps
    }, []);

    const [lucidWallet, setLucidWallet] = useState<Lucid>(null!);

    const connectWallet = async function () {
        try {
            let lucid: Lucid;
            lucid = await Lucid.new(
                new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD as string, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD as string),
                "Preprod",
            );
            lucid.selectWallet(await window.cardano.nami.enable());
            let walletAddress = await lucid.wallet.address();
            setWalletAddress(walletAddress);
            const utxos = await lucid.wallet.getUtxos();
            const walletBalance =
                Number(
                    utxos.reduce(function (balance, utxo) {
                        return balance + utxo.assets.lovelace;
                    }, BigInt(0)),
                ) / 1000000;

            setLucidWallet(lucid);
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    return (
        <LucidContext.Provider
            value={{
                walletAddress,
                connectWallet,
                lucidWallet,
                lucidNeworkPlatform,
                setLucidNeworkPlatform,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
