import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { Account } from "../entities/account";
import { UnauthorizedError } from "../util/api-errors.util";

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

        const decodedToken = jwt.verify(token, secret ?? "");

        res.locals.account = decodedToken as Account;
        
        next()
    } catch(error) {
        throw new UnauthorizedError("Invalid or expired token");
    }
}