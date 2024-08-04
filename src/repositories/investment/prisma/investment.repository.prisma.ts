import { PrismaClient } from "@prisma/client";
import { Investment } from "../../../entities/investment";
import { InvestmentRepository } from "../investment.repository";
import { NotFoundError } from "../../../util/api-errors.util";

export class InvestmentRepositoryPrisma implements InvestmentRepository {
    private constructor(readonly prisma: PrismaClient){}

    public static build(prisma: PrismaClient) {
        return new InvestmentRepositoryPrisma(prisma)
    }

    public async save(investment: Investment): Promise<Investment> {
        const data = {
            invested_amount: investment.investedAmount,
            btc_quantity: investment.btcQuantity,
            purchase_rate: investment.purchaseRate,
            account_id: investment.accountId,
        };

        const aInvestment = await this.prisma.investment.create({
            data,
        });

        return Investment.with(
            aInvestment.id,
            investment.investedAmount,
            investment.btcQuantity,
            investment.purchaseRate,
            aInvestment.created_at.toString(),
            aInvestment.account_id
        )
    }

    public async update(investment: Investment): Promise<void> {
        const data = {
            id: investment.id,
            invested_amount: investment.investedAmount,
            btc_quantity: investment.btcQuantity,
            purchase_rate: investment.purchaseRate,
            account_id: investment.accountId,
        };

        await this.prisma.investment.update({
            where: {
                id: investment.id
            },
            data,
        });
    }

    public async findByIdAccount(id: string): Promise<Investment[]> {
        const investments = await this.prisma.investment.findMany({
            where: { 
                account_id: id,
            }, 
        });

        const response = investments.map(investment => {
            const { invested_amount, btc_quantity, purchase_rate, created_at, account_id } = investment;

            return Investment.with(id, invested_amount, btc_quantity, purchase_rate, created_at.toString(), account_id);
        });

        return response;
    }
    
}