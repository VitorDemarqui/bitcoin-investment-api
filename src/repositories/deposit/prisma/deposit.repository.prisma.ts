import { PrismaClient } from "@prisma/client";
import { Deposit } from "../../../entities/deposit";
import { DepositRepository } from "../deposit.repository";

export class DepositRepositoryPrisma implements DepositRepository {
    private constructor(readonly prisma: PrismaClient){}

    public static build(prisma: PrismaClient) {
        return new DepositRepositoryPrisma(prisma)
    }

    public async save(deposit: Deposit): Promise<Deposit> {
        const data = {
            amount: deposit.amount,
            account_id: deposit.accountId,
        };

        const aDeposit = await this.prisma.deposit.create({
            data,
        });

        return Deposit.with(
            aDeposit.id,
            data.amount,
            aDeposit.created_at.toString(),
            aDeposit.email_sent,
            data.account_id
        )
    }
}