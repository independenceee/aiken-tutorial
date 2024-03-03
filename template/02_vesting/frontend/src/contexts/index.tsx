"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const WalletProvider = lazy(
    () => import("~/contexts/providers/WalletProvider")
);

const SmartContractProvider = lazy(
    () => import("~/contexts/providers/SmartContractProvider")
);

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <WalletProvider>
                <SmartContractProvider>{children}</SmartContractProvider>
            </WalletProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
