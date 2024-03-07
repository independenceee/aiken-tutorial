"use client";

import React, { ReactNode, useContext } from "react";
import WalletContext from "../components/WalletContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "../components/LucidContext";
import { Blockfrost, Lucid } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
    const { setLucid } = useContext<LucidContextType>(LucidContext);

    const connect = async function () {
        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0",
                    "preprody7qLCi4kIiAUEFRlJvmZ2PTi6jreF7gI"
                ),
                "Preprod"
            );

            lucid.selectWallet(await window.cardano.nami.enable());
            setLucid(lucid);
        } catch (error) {
            console.log(error);
        }
    };

    const disconnect = async function () {
        setLucid(null!);
    };
    return (
        <WalletContext.Provider value={{ connect, disconnect }}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;
