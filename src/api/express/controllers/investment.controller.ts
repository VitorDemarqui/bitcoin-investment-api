import { Request, Response } from "express";
import { Investment } from "../../../entities/investment";
import { InvestmentRepositoryPrisma } from "../../../repositories/investment/prisma/investment.repository.prisma";
import { prisma } from "../../../util/prisma.util";
import { InvestmentServiceImplementation } from "../../../services/investment/implementation/investment.service.implementation";
import { Decimal } from "@prisma/client/runtime/library";
import { decimalToNumber } from "../../../util/numberFormatter.util";

export class InvestmentController {
    private constructor(){}

    public static build(){
        return new InvestmentController;
    }

    public async create(request: Request, response: Response) {
        const { amount } = request.body;
        const account = response.locals.account;

        const deposit = Investment.create(amount, new Decimal(0), new Decimal(0), account.id)

        const aRepository = InvestmentRepositoryPrisma.build(prisma);
        const aService = InvestmentServiceImplementation.build(aRepository);

        const output = await aService.create(deposit, account);

        const body = {
            statusCode: 201,
            message: "Investment successfully created",
            data: {
                id: output.id,
                amount,
                bitcoinQuantity: output.btcQuantity.toFixed(8),
                purchaseRate: output.purchaseRate,
                balance: decimalToNumber(output.balance),
                createdAt: output.createdAt
            }
        };

        response.status(201).json(body).send();
    }
}