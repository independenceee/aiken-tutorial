import * as dotenv from "dotenv";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
dotenv.config();

const apiBlockfrost = new BlockFrostAPI({
    projectId: process.env.BLOCKFROST_PROJECT_ID_SECRET_PREPROD!,
});

export default apiBlockfrost;
