import ApiError from "./ApiError";
import { StatusCodes } from "http-status-codes";

class BadRequest extends ApiError {
    statusCode: number;
    error: string;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.error = "Bad request";
    }
}

export default BadRequest;
