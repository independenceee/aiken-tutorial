"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "@/contexts/components/LucidContext";
import { WalletItemType } from "@/types/GenericsType";

type Props = { children: ReactNode };

const LucidProvider = function ({ children }: Props) {
    const [networkPlatform, setNetworkPlatform] = useState<string>("Preprod");
    const [loadingConnectWallet, setLoadingConnectWallet] = useState<boolean>(false);
    const [lucidNeworkPlatform, setLucidNeworkPlatform] = useState<Lucid>(null!);

    useEffect(() => {
        const chooseLucidNetworkPlatform = async function () {
            let lucid: Lucid;
            switch (networkPlatform) {
                case "Preprod":
                    lucid = await Lucid.new(
                        new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD as string, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD as string),
                        networkPlatform,
                    );

                    break;
                case "Preview":
                    lucid = await Lucid.new(
                        new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD as string, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD as string),
                        networkPlatform,
                    );
                    break;
                case "Mainnet":
                    lucid = await Lucid.new(
                        new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnettClW67e7zjxBTdjgynNwmGsvyz5DCMmC"),
                        networkPlatform,
                    );
                    break;
                default:
                    throw new Error("Invalid networkPlatform");
            }

            setLucidNeworkPlatform(lucid);
        };

        chooseLucidNetworkPlatform();

        // react-hooks/exhaustive-deps
    }, [networkPlatform]);

    useEffect(() => {
        setLucidWallet(lucidNeworkPlatform);

        // react-hooks/exhaustive-deps
    }, [networkPlatform]);

    const [lucidWallet, setLucidWallet] = useState<Lucid>(null!);

    const [walletItem, setWalletItem] = useState<WalletItemType>({
        walletDownloadApi: "",
        walletBalance: 0,
        walletAddress: "",
        walletName: "",
        walletImage: "",
        walletCheckApi: async function () {},
        walletApi: async function () {},
    });

    const connectWallet = async function ({ walletApi, walletName, walletImage, walletCheckApi }: WalletItemType) {
        try {
            setLoadingConnectWallet(true);

            let lucid: Lucid;
            switch (networkPlatform) {
                case "Preprod":
                    lucid = await Lucid.new(
                        new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD as string, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD),
                        networkPlatform,
                    );

                    break;
                case "Preview":
                    lucid = await Lucid.new(
                        new Blockfrost(process.env.BLOCKFROST_RPC_URL_PREPROD as string, process.env.BLOCKFROST_PROJECT_API_KEY_PREPROD),
                        networkPlatform,
                    );
                    break;

                case "Mainnet":
                    lucid = await Lucid.new(
                        new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnettClW67e7zjxBTdjgynNwmGsvyz5DCMmC"),
                        networkPlatform,
                    );
                    break;
                default:
                    throw new Error("Invalid networkPlatform");
            }

            lucid.selectWallet(await walletApi());
            let walletAddress = await lucid.wallet.address();
            if (walletAddress.includes("addr1")) {
                lucid.selectWallet(null!);
                lucid = await Lucid.new(
                    new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnettClW67e7zjxBTdjgynNwmGsvyz5DCMmC"),
                    "Mainnet",
                );
                lucid.selectWallet(await walletApi());
                walletAddress = await lucid.wallet.address();
            }
            const utxos = await lucid.wallet.getUtxos();
            const walletBalance =
                Number(
                    utxos.reduce(function (balance, utxo) {
                        return balance + utxo.assets.lovelace;
                    }, BigInt(0)),
                ) / 1000000;

            setLucidWallet(lucid);
            setWalletItem(function (prevous: WalletItemType) {
                return {
                    ...prevous,
                    walletAddress: walletAddress,
                    walletBalance: walletBalance,
                    walletName: walletName,
                    walletImage: walletImage,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingConnectWallet(false);
        }
    };

    const disconnectWallet = async function () {
        try {
            setWalletItem({
                walletDownloadApi: "",
                walletBalance: 0,
                walletAddress: "",
                walletName: "",
                walletImage: "",
                walletCheckApi: async function () {},
                walletApi: async function () {},
            });
            setLucidWallet(null!);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LucidContext.Provider
            value={{
                networkPlatform,
                disconnectWallet,
                connectWallet,
                lucidWallet,
                walletItem,
                lucidNeworkPlatform,
                setWalletItem,
                setLucidNeworkPlatform,
                setNetworkPlatform,
                loadingConnectWallet,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
