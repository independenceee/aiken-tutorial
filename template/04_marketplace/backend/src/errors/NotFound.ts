import ApiError from "./ApiError";
import { StatusCodes } from "http-status-codes";

class NotFound extends ApiError {
    statusCode: number;
    error: string;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
        this.error = "Not found";
    }
}
export default NotFound;
