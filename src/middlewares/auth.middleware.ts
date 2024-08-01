import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from "../helpers/api-errors.helper";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        throw new UnauthorizedError("Invalid or expired token");
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret ?? "");

        next()
    } catch(error) {
        throw new UnauthorizedError("Invalid or expired token");
    }
}