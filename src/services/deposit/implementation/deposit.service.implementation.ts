import { Account } from "../../../entities/account";
import { Deposit } from "../../../entities/deposit";
import Queue from "../../../lib/Queue";
import { AccountRepositoryPrisma } from "../../../repositories/account/prisma/account.repository.prisma";
import { DepositRepository } from "../../../repositories/deposit/deposit.repository";
import { decimalFormatterBRL } from "../../../util/numberFormatter.util";
import { prisma } from "../../../util/prisma.util";
import { AccountServiceImplementation } from "../../account/implementation/account.service.implementation";
import { CreateDepositOutputDto, DepositService } from "../deposit.service";

export class DepositServiceImplementation implements DepositService {
    private constructor(readonly repository: DepositRepository){}

    public static build(repository: DepositRepository) {
        return new DepositServiceImplementation(repository);
    }

    public async create(deposit: Deposit, account: Account): Promise<CreateDepositOutputDto> {
        const aRepository = AccountRepositoryPrisma.build(prisma);
        const aService = AccountServiceImplementation.build(aRepository);

        const { amount, accountId } = deposit;

        const aDeposit = Deposit.create(amount, accountId);

        const newDeposit = await this.repository.save(aDeposit);

        const balance = await aService.increaseAccountBalance(amount, accountId);

        await Queue.add('RegistrationMail', { 
            id: newDeposit.id,
            email: account.email ,
            subject: 'Seu depósito foi processado com sucesso!',
            text: 'Você depositou com sucesso ' + decimalFormatterBRL(amount) + '.'
        })

        const output: CreateDepositOutputDto = {
            id: newDeposit.id,
            amount,
            balance,
            createdAt: newDeposit.createdAt
        };

        return output;
    }
}