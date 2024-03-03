import ApiError from "./ApiError";
import { StatusCodes } from "http-status-codes";

class InternalServerError extends ApiError {
    statusCode: number;
    error: string;
    constructor(message: string | any) {
        super(message);
        this.error = "internal server error";
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

export default InternalServerError;
