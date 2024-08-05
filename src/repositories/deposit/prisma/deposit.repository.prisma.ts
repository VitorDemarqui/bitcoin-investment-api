import { PrismaClient } from "@prisma/client";
import { Deposit } from "../../../entities/deposit";
import { DepositRepository } from "../deposit.repository";
import { NotFoundError } from "../../../util/api-errors.util";

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
            data.account_id
        )
    }

    public async update(deposit: Deposit): Promise<void> {
        const data = {
            id: deposit.id,
            amount: deposit.amount,
            account_id: deposit.accountId
        };

        await this.prisma.deposit.update({
            where: {
                id: deposit.id
            },
            data,
        });
    }

    public async findById(id: string): Promise<Deposit> {
        const deposit = await this.prisma.deposit.findUnique({
            where: { id },
        });

        if(!deposit) {
            throw new NotFoundError("Deposit not found");
        }

        const { amount, created_at, account_id } = deposit;

        const response = Deposit.with(id, amount, created_at.toString(), account_id);

        return response;
    }
}