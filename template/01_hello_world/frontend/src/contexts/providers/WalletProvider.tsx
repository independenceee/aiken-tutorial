"use client";

import React, { ReactNode, useContext, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import WalletContext from "~/contexts/components/WalletContext";
import LucidContext from "~/contexts/components/LucidContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";

type Props = {
    children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
    const { setLucid } = useContext<LucidContextType>(LucidContext);

    const connect = async function () {
        // TODO: Connect wallet
    };

    const disconnect = async function () {
        // TODO: Disconnect wallet
    };

    return (
        <WalletContext.Provider
            value={{
                connect,
                disconnect,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;
