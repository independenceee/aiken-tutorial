import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("./LucidProvider"));
const SmartcontractProvider = lazy(() => import("./SmartcontractProvider"));
const WalletProvider = lazy(() => import("./WalletProvider"));
const AccountProvider = lazy(() => import("./AccountProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <SmartcontractProvider>
                <WalletProvider>
                    <AccountProvider>{children}</AccountProvider>
                </WalletProvider>
            </SmartcontractProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
