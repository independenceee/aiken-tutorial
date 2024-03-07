export type WalletContextType = {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}