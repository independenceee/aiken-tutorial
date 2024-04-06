"use client";

import React, {
    ReactNode,
    useState,
    createContext,
    useContext,
    useEffect,
} from "react";
import { Blockfrost, Lucid, UTxO } from "lucid-cardano";
import { LucidContext, LucidContextType } from "./LucidProvider";
import wallets from "../constants/wallets";

type Props = {
    children: ReactNode;
};

export type WalletType = {
    name: string;
    image: string;
    balance?: number;
    address?: string;
    downloadApi?: string;
    api: () => Promise<any> | any;
    checkApi: () => Promise<any> | any;
};

export type WalletContextType = {
    connect: ({ name, api, image }: WalletType) => Promise<void>;
    disconnect: () => Promise<void>;
    refresh: () => Promise<void>;
    loading: boolean;
    wallet: WalletType;
};

export const WalletContext = createContext<WalletContextType>(null!);

const WalletProvider = function ({ children }: Props) {
    const { lucid, setLucid } = useContext<LucidContextType>(LucidContext);

    const [wallet, setWallet] = useState<WalletType>(null!);
    const [loading, setLoading] = useState<boolean>(false);

    const connect = async function ({ name, api, image }: WalletType) {
        try {
            setLoading(true);

            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0",
                    "preprody7qLCi4kIiAUEFRlJvmZ2PTi6jreF7gI"
                ),
                "Preprod"
            );

            lucid.selectWallet(await api());
            const address: string = (await lucid.wallet.address()) as string;

            const stakeKey: string =
                (await lucid.wallet.rewardAddress()) as string;
            const utxos: Array<UTxO> =
                (await lucid.wallet.getUtxos()) as Array<UTxO>;
            const { poolId } = await lucid.delegationAt(stakeKey as string);
            const balance: number = utxos.reduce(function (
                balance: number,
                utxo: UTxO
            ) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            },
            0);

            setWallet(function (previous: WalletType) {
                return {
                    ...previous,
                    name: name,
                    image: image,
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                };
            });
            setLucid(lucid);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const disconnect = async function () {
        try {
            setWallet(null!);
            setLucid(null!);
        } catch (error) {
            console.log(error);
        }
    };

    const refresh = async function () {
        try {
            setLoading(true);
            const address: string = await lucid.wallet.address();
            const stakeKey: string =
                (await lucid.wallet.rewardAddress()) as string;
            const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
            const { poolId } = await lucid.delegationAt(stakeKey as string);
            const balance: number = utxos.reduce(function (balance, utxo) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            }, 0);

            setWallet(function (previous: WalletType) {
                return {
                    ...previous,
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <WalletContext.Provider
            value={{
                wallet,
                connect,
                disconnect,
                loading,
                refresh,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;
