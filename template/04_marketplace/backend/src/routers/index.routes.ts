import { Express } from "express";
import blockfrostAssetsRouter from "./blockfrost/assets.routes";
import blockfrostTransactionRouter from "./blockfrost/transaction.routes";
import koiosAssetsRouter from "./koios/assets.routes";
import stakekeyRouter from "./emurgo/stakekey.routes";

const router = function (app: Express) {
    app.use("/api/v1/blockfrost/transaction", blockfrostTransactionRouter);
    app.use("/api/v1/blockfrost/assets", blockfrostAssetsRouter);
    app.use("/api/v1/koios/assets", koiosAssetsRouter);
    app.use("/api/v1/emurgo/stakekey", stakekeyRouter);
};

export default router;
