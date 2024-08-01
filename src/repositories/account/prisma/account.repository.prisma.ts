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
            aAccount.createdAt.toString(),
            data.password
        )
    }
    
    public async findById(id: string): Promise<Account> {
        const aAccount = await this.prisma.account.findUnique({
            where: { id },
        });

        if(!aAccount) {
            throw new NotFoundError("Account not found");
        }

        const { name, email, createdAt, password } = aAccount;

        const response = Account.with(id, name, email, createdAt.toString(), password);

        return response;
    }

    public async findByEmail(email: string): Promise<Account|null>{
        const aAccount = await this.prisma.account.findUnique({
            where: { email },
        });

        if(!aAccount) {
            return null;
        }

        const { id, name, createdAt, password } = aAccount;

        const response = Account.with(id, name, email, createdAt.toString(), password);

        return response;
    }
}