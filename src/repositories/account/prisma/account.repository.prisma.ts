import { PrismaClient } from "@prisma/client";
import { Account } from "../../../entities/account";
import { AccountRepository } from "../account.repository";
import { NotFoundError } from "../../../helpers/api-errors.helper";

export class AccountRepositoryPrisma implements AccountRepository {

    private constructor(readonly prisma: PrismaClient){}

    public static build(prisma: PrismaClient) {
        return new AccountRepositoryPrisma(prisma)
    }

    public async save(account: Account): Promise<Account> {
        const data = {
            name: account.name,
            email: account.email,
            password: account.password,
        };

        const aAccount = await this.prisma.account.create({
            data,
        });

        return Account.with(
            aAccount.id,
            data.name,
            data.email,
            aAccount.balance,
            aAccount.created_at.toString(),
            data.password
        )
    }

    public async update(account: Account): Promise<void> {
        const data = {
            id: account.id,
            name: account.name,
            email: account.email,
            balance: account.balance,
            password: account.password,
        };

        await this.prisma.account.update({
            where: {
                id: account.id
            },
            data,
        });
    }

    
    public async findById(id: string): Promise<Account> {
        const aAccount = await this.prisma.account.findUnique({
            where: { id },
        });

        if(!aAccount) {
            throw new NotFoundError("Account not found");
        }

        const { name, email, balance, created_at, password } = aAccount;

        const response = Account.with(id, name, email, balance, created_at.toString(), password);

        return response;
    }

    public async findByEmail(email: string): Promise<Account|null>{
        const aAccount = await this.prisma.account.findUnique({
            where: { email },
        });

        if(!aAccount) {
            return null;
        }

        const { id, name, balance, created_at, password } = aAccount;

        const response = Account.with(id, name, email, balance, created_at.toString(), password);

        return response;
    }
}