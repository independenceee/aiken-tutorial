import { Router } from "express";
import transactionController from "../../controllers/blockfrost/Transaction.controller";

const router = Router();

router.route("/utxos").post(transactionController.getUTXOsTransaction);
router.route("/detail").post(transactionController.getDetailsTransactions);
router.route("/account").post(transactionController.getTransactionAccount);
router.route("/asset").post(transactionController.getTransactionAsset);

export default router;
