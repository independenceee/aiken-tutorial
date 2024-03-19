import configs from "@/configs";

const publicRouters = [
    { name: "Home", redirect: configs.routes.home },
    { name: "Marketplace", redirect: configs.routes.marketplace },
    { name: "Mint", redirect: configs.routes.mint },
    { name: "About", redirect: configs.routes.about },
    { name: "Guide", redirect: configs.routes.guide },
];

export { publicRouters };
