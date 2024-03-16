import configs from "@/configs";
import images from "@/assets/images";
import { WalletItemType } from "@/types/GenericsType";

declare const window: any;

const wallets: Array<WalletItemType> = [
    {
        walletName: "Nami",
        walletImage: images.namiWallet,
        walletApi: async function () {
            return await window.cardano.nami.enable();
        },
        walletCheckApi: async function () {
            return await window.cardano.nami;
        },
        walletDownloadApi: configs.wallets.nami,
    },
    {
        walletName: "Eternl",
        walletImage: images.eternlWallet,
        walletApi: async function () {
            return window.cardano.eternl.enable();
        },
        walletCheckApi: async function () {
            return await window.cardano.eternl;
        },
        walletDownloadApi: configs.wallets.eternl,
    },
    {
        walletName: "Flint",
        walletImage: images.flintWallet,
        walletApi: async function () {
            return await window.cardano.flint.enable();
        },
        walletCheckApi: async function () {
            return await window.cardano.flint;
        },
        walletDownloadApi: configs.wallets.flint,
    },
    {
        walletName: "Lace",
        walletImage: images.laceWallet,
        walletApi: async function () {
            return await window.cardano.lace.enable();
        },
        walletCheckApi: async function () {
            return await window.cardano.lace;
        },
        walletDownloadApi: configs.wallets.lace,
    },
    // {
    //     walletName: "Gero",
    //     walletImage: images.geroWallet,
    //     walletApi: async function () {
    //         return await window.cardano.gero.enable();
    //     },
    //     walletCheckApi: async function () {
    //         return await window.cardano.gero;
    //     },
    //     walletDownloadApi: configs.wallets.gero,
    // },
    // {
    //     walletName: "Typhon",
    //     walletImage: images.typhonWallet,
    //     walletApi: async function () {
    //         return await window.cardano.typhon.enable();
    //     },
    //     walletCheckApi: async function () {
    //         return await window.cardano.typhon;
    //     },
    //     walletDownloadApi: configs.wallets.typhon,
    // },
    // {
    //     walletName: "Vespr",
    //     walletImage: images.vesprWallet,
    //     walletApi: async function () {
    //         return await window.cardano.vespr.enable();
    //     },
    //     walletCheckApi: async function () {
    //         return await window.cardano.vespr;
    //     },
    //     walletDownloadApi: configs.wallets.vespr,
    // },
];

export default wallets;
