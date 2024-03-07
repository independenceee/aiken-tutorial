"use client";

import React, { ReactNode, lazy } from "react";

const WalletProvider = lazy(
    () => import("~/contexts/providers/WalletProvider")
);
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const SmartcontractProvider = lazy(
    () => import("~/contexts/providers/SmartcontractProvider")
);
type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <WalletProvider>
                <SmartcontractProvider>{children}</SmartcontractProvider>
            </WalletProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
