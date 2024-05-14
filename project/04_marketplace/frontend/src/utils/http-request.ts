import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL!,
});

export const get = async function (path: string, options = {}) {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async function (path: string, options = {}) {
    const response = await httpRequest.post(path, options);
    return response.data;
};

export const patch = async function (path: string, options = {}) {
    const response = await httpRequest.patch(path, options);
    return response.data;
};

export const del = async function (path: string, options = {}) {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
