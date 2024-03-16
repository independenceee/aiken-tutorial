import configs from "@/configs";

const publicRouters = [
    { name: "Home", redirect: configs.routes.home },
    { name: "Mint", redirect: configs.routes.mint },
];

export { publicRouters };
