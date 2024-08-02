import { Request, Response } from "express";

import { DepositRepositoryPrisma } from "../../../repositories/deposit/prisma/deposit.repository.prisma";
import { DepositServiceImplementation } from "../../../services/deposit/implementation/deposit.service.implementation";
import { Deposit } from "../../../entities/deposit";
import { prisma } from "../../../util/prisma.util";
import { decimalToNumber } from "../../../util/numberFormatter.util";

export class DepositController {
    private constructor(){}

    public static build(){
        return new DepositController;
    }

    public async create(request: Request, response: Response) {
        const { amount } = request.body;
        const account = response.locals.account;

        const deposit = Deposit.create(amount, account.id)

        const aRepository = DepositRepositoryPrisma.build(prisma);
        const aService = DepositServiceImplementation.build(aRepository);

        const output = await aService.create(deposit, account);

        const body = {
            statusCode: 200,
            message: "Deposit successfully created",
            data: {
                id: output.id,
                balance: decimalToNumber(output.balance),
                createdAt: output.createdAt
            }
        };

        response.status(200).json(body).send();
    }
}