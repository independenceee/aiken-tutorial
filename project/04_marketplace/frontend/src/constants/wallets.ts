const configs = {
    nami: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    eternl: "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    flint: "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    gero: "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    typhon: "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    vespr: "https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main",
    lace: "https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk",
    yoroi: "https://chromewebstore.google.com/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb",
    nufi: "https://chromewebstore.google.com/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
} as const;

import images from "../assets/images";

declare const window: any;

const wallets = [
    {
        name: "Nami",
        image: images.nami,
        api: async function () {
            return await window.cardano.nami.enable();
        },
        checkApi: async function () {
            return (await window.cardano.nami).catch((e: unknown) => {
                console.log(e);
            });
        },
        downloadApi: configs.nami,
    },
    {
        name: "Eternl",
        image: images.eternl,
        api: async function () {
            return window.cardano.eternl.enable();
        },
        checkApi: async function () {
            return await window.cardano.eternl;
        },
        downloadApi: configs.eternl,
    },
    {
        name: "Flint",
        image: images.flint,
        api: async function () {
            return await window.cardano.flint.enable();
        },
        checkApi: async function () {
            return await window.cardano.flint;
        },
        downloadApi: configs.flint,
    },
    {
        name: "Lace",
        image: images.lace,
        api: async function () {
            return await window.cardano.lace.enable();
        },
        checkApi: async function () {
            return await window.cardano.lace;
        },
        downloadApi: configs.lace,
    },
    {
        name: "Gero",
        image: images.gero,
        api: async function () {
            return await window.cardano.gero.enable();
        },
        checkApi: async function () {
            return await window.cardano.gero;
        },
        downloadApi: configs.gero,
    },
    {
        name: "Typhon",
        image: images.typhon,
        api: async function () {
            return await window.cardano.typhon.enable();
        },
        checkApi: async function () {
            return await window.cardano.typhon;
        },
        downloadApi: configs.typhon,
    },
    {
        name: "Vespr",
        image: images.vespr,
        api: async function () {
            return await window.cardano.vespr.enable();
        },
        checkApi: async function () {
            return await window.cardano.vespr;
        },
        downloadApi: configs.vespr,
    },
    {
        name: "Yoroi",
        image: images.yoroi,
        api: async function () {
            return await window.cardano.yoroi.enable();
        },
        checkApi: async function () {
            return await window.cardano.yoroi;
        },
        downloadApi: configs.yoroi,
    },
    {
        name: "Nufi",
        image: images.nufi,
        api: async function () {
            return await window.cardano.nufi.enable();
        },
        checkApi: async function () {
            return await window.cardano.nufi;
        },
        downloadApi: configs.nufi,
    },
] as const;

export default wallets;