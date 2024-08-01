import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { prisma } from "../../../util/prisma.util";
import { AccountRepositoryPrisma } from "../../../repositories/account/prisma/account.repository.prisma";
import { AccountServiceImplementation } from "../../../services/account/implementation/account.service.implementation";

export class AuthController {
    private constructor(){}

    public static build(){
        return new AuthController;
    }

    public async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const aRepository = AccountRepositoryPrisma.build(prisma);
        const aService = AccountServiceImplementation.build(aRepository);

        await aService.validateCredentials(email, password);
        
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                email
            },
            secret ?? '',
            {
                expiresIn: 120
            }
        )

        response.status(200).json({email, token}).send();
    }
}