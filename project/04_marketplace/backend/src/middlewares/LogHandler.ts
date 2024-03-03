import logEvents from "../utils/LogEvents";
import { NextFunction, Request, Response } from "express";

const LogHandler = function (request: Request, response: Response, next: NextFunction) {
    logEvents(`${request.method}\t${request.url}\t${request.headers.origin}`, "reqLog.log");
    next();
};

export default LogHandler;
