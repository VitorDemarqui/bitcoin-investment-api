import { Deposit } from "../../../entities/deposit";
import { AccountRepositoryPrisma } from "../../../repositories/account/prisma/account.repository.prisma";
import { DepositRepository } from "../../../repositories/deposit/deposit.repository";
import { prisma } from "../../../util/prisma.util";
import { AccountServiceImplementation } from "../../account/implementation/account.service.implementation";
import { CreateDepositOutputDto, DepositService } from "../deposit.service";

export class DepositServiceImplementation implements DepositService {
    private constructor(readonly repository: DepositRepository){}

    public static build(repository: DepositRepository) {
        return new DepositServiceImplementation(repository);
    }

    public async create(deposit: Deposit): Promise<CreateDepositOutputDto> {
        const aRepository = AccountRepositoryPrisma.build(prisma);
        const aService = AccountServiceImplementation.build(aRepository);

        const { amount, accountId} = deposit;

        const aDeposit = Deposit.create(amount, accountId);

        const newDeposit = await this.repository.save(aDeposit);

        await aService.increaseAccountBalance(amount, accountId);

        const output: CreateDepositOutputDto = {
            id: newDeposit.id,
            amount,
            createdAt: newDeposit.createdAt
        };

        return output;
    }
}