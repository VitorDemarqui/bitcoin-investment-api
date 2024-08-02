import { Request, Response } from "express";
import { Decimal } from "@prisma/client/runtime/library";


import { DepositRepositoryPrisma } from "../../../repositories/deposit/prisma/deposit.repository.prisma";
import { DepositServiceImplementation } from "../../../services/deposit/implementation/deposit.service.implementation";
import { Deposit } from "../../../entities/deposit";
import { prisma } from "../../../util/prisma.util";

export class DepositController {
    private constructor(){}

    public static build(){
        return new DepositController;
    }

    public async create(request: Request, response: Response) {
        const { amount } = request.body;
        const account = response.locals.account;

        const aDeposit = Deposit.create(amount, account.id)

        const aRepository = DepositRepositoryPrisma.build(prisma);
        const aService = DepositServiceImplementation.build(aRepository);

        const output = await aService.create(aDeposit);

        const body = {
            statusCode: 200,
            message: "Deposit successfully created",
            data: {
                id: output.id,
                amount: Decimal,
                createdAt: output.createdAt
            }
        };

        response.status(200).json(body).send();
    }
}