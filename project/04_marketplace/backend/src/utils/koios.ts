import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const instants = axios.create({
    baseURL: process.env.KOIOS_RPC_URL_PREPROD!,
    withCredentials: true,
});

const get = async function (path: string, options: any) {
    const response = await instants.get(path, options);
    return response.data;
};

const post = async function (path: string, options: any) {
    const response = await instants.post(path, options);
    return response.data;
};

export { get, post };
export default instants;
