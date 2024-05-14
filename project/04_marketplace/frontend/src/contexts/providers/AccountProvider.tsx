"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Blockfrost, Lucid, Network } from "lucid-cardano";
import LucidContext from "~/contexts/components/LucidContext";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "../components/NetworkContext";
import { networks } from "~/constants/networks";
import AccountContext from "../components/AccountContext";
import { AccountType } from "~/types/GenericsType";
import { post } from "~/utils/http-request";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "../components/WalletContext";
import { toast } from "react-toastify";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [account, setAccount] = useState<AccountType>(null!);
    const { wallet } = useContext<WalletContextType>(WalletContext);

    useEffect(() => {
        const fetchAccountFromAddress = async function () {
            setLoading(true);
            const account = await post("/accounts", {
                walletAddress: wallet?.address,
                stakeAddress: wallet?.stakeKey,
            });

            setAccount(account);
            toast.success("Login account successfully.");

            setLoading(false);
        };
        if (wallet?.address) {
            fetchAccountFromAddress();
        }
    }, [wallet?.address]);

    return <AccountContext.Provider value={{ loading, account }}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
