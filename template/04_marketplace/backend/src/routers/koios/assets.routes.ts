import { Router } from "express";
import assetsController from "../../controllers/koios/Assets.controller";

const router = Router();

router.route("/nft-address").post(assetsController.assetNftAddress);
router.route("/information").post(assetsController.assetInfomation);
router.route("/policy-assets-information").post(assetsController.policyAssetInfomation);
router.route("/assets-policy-information").post(assetsController.assetPolicyInfomation);
router.route("/summary").post(assetsController.assetSummary);
router.route("/policy-list").post(assetsController.policyAssetList);
router.route("/account-list").get(assetsController.accountList);
router.route("/address-assets").post(assetsController.addressAsset);

export default router;
