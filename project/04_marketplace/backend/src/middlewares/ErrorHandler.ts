import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import logEvents from "../utils/LogEvents";

const errorHandlerMiddleware = function (error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {
    logEvents(`${error.name}: ${error.name}\t${request.method}\t${request.url}\t${request.headers.origin}`, "errLog.log");

    const status = response.statusCode ? response.statusCode : StatusCodes.BAD_GATEWAY;

    response.status(status).json({
        isError: true,
        message: error.name,
    });
};

export default errorHandlerMiddleware;
