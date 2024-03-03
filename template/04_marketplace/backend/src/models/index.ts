import {
    PrismaClient,
    Cart,
    Category,
    Blog,
    Account,
    Nft,
    Founder,
    Guide,
    Statistics,
} from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
export { Account, Guide, Founder, Statistics, Nft, Category, Cart };
