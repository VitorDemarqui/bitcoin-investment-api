import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/api-errors.util";

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal Server Error'
    console.log(error.message)
    return res.status(statusCode).json({statusCode, message})
}