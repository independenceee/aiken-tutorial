import { Lucid } from "lucid-cardano";
import { WalletItemType } from "./GenericsType";

export type LucidContextType = {
    networkPlatform: string;
    lucidWallet: Lucid;
    walletItem: WalletItemType;
    setWalletItem: React.Dispatch<React.SetStateAction<WalletItemType>>;
    connectWallet: ({
        walletApi,
        walletName,
        walletImage,
        walletCheckApi,
    }: WalletItemType) => Promise<any>;
    disconnectWallet: () => Promise<any>;
    lucidNeworkPlatform: Lucid;
    setLucidNeworkPlatform: React.Dispatch<React.SetStateAction<Lucid>>;
    setNetworkPlatform: React.Dispatch<React.SetStateAction<string>>;
    loadingConnectWallet: boolean;
};
