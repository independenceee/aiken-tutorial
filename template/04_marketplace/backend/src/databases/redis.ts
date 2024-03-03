import Redis from "ioredis";
import * as dotenv from "dotenv";
dotenv.config();

const REDIS_URL = process.env.REDIS_URL!;

const redis = new Redis(REDIS_URL);

export default redis;
