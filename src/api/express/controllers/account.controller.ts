import { Request, Response } from "express";

import { prisma } from "../../../util/prisma.util";
import { Account } from "../../../entities/account";
import { AccountRepositoryPrisma } from "../../../repositories/account/prisma/account.repository.prisma";
import { AccountServiceImplementation } from "../../../services/account/implementation/account.service.implementation";
import { Decimal } from "@prisma/client/runtime/library";
import { decimalFormatterBRL } from "../../../util/numberFormatter.util";

export class AccountController {
    private constructor(){}

    public static build(){
        return new AccountController;
    }

    public async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const aAccount = Account.with("", name, email, new Decimal(0.00), "", password)

        const aRepository = AccountRepositoryPrisma.build(prisma);
        const aService = AccountServiceImplementation.build(aRepository);

        const output = await aService.create(aAccount);

        const data = {
            id: output.id,
            name: output.name,
            email: output.email,
            createdAt: output.createdAt,
        };

        response.status(201).json(data).send();
    }

    public async getBalance(request: Request, response: Response) {
        const account = response.locals.account;

        const aRepository = AccountRepositoryPrisma.build(prisma);
        const aService = AccountServiceImplementation.build(aRepository);

        const balance: Decimal = await aService.getBalance(account.id);

        const data = {
            balance : decimalFormatterBRL(balance)
        };

        response.status(200).json(data).send();
    }
}