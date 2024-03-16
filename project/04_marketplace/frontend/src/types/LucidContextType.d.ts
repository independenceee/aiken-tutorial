import { Lucid } from "lucid-cardano";

export type LucidContextType = {
    walletAddress: string;
    lucidWallet: Lucid;
    connectWallet: () => Promise<any>;
    lucidNeworkPlatform: Lucid;
    setLucidNeworkPlatform: React.Dispatch<React.SetStateAction<Lucid>>;
};
