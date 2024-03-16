"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const SmartContractProvider = lazy(() => import("@/contexts/providers/SmartContractProvider"));
const AccountProvider = lazy(() => import("@/contexts/providers/AccountProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <SmartContractProvider>
                <AccountProvider>{children}</AccountProvider>
            </SmartContractProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
