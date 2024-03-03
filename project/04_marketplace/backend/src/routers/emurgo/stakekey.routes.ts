import { Router } from "express";
import stakekeyController from "../../controllers/emurgo/StakekeyController";

const router = Router();

router.route("/address").post(stakekeyController.getStakekeyFromAddress);

export default router;
