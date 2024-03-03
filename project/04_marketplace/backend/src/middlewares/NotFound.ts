import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFound } from "../errors";

const notFound = function (request: Request, response: Response) {
    response.status(StatusCodes.NOT_FOUND).json(new NotFound("Route does not exist !"));
};

export default notFound;
