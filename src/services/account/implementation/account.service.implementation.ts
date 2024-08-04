import bcrypt from "bcrypt";

import { Account } from "../../../entities/account";
import { AccountAuthenticatedOutputDto, AccountService, CreateAccountOutputDto } from "../account.service";
import { AccountRepository } from "../../../repositories/account/account.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { BadRequestError } from "../../../util/api-errors.util";

export class AccountServiceImplementation implements AccountService {
    private constructor(readonly repository: AccountRepository){}

    public static build(repository: AccountRepository) {
        return new AccountServiceImplementation(repository);
    }

    public async create(account: Account): Promise<CreateAccountOutputDto> {
        const { name, email, password} = account;

        const aAccount = Account.formatCreateAccountValues("", name, email, "", password);

        const accountExists = await this.repository.findByEmail(email);

        if(accountExists) {
            throw new BadRequestError('Account already exists.');
        }

        const newAccount = await this.repository.save(aAccount);

        const output: CreateAccountOutputDto = {
            id: newAccount.id,
            name,
            email,
            createdAt: newAccount.createdAt
        };

        return output;
    }

    public async validateCredentials(email: string, password: string): Promise<AccountAuthenticatedOutputDto> {
        const account = await this.repository.findByEmail(email);

        if(!account) {
            throw new BadRequestError('The email/password you entered isnt connected to an account');
        }

        const passwordIsValid = bcrypt.compareSync(password, account.password);

        if(!passwordIsValid) {
            throw new BadRequestError('The email/password you entered isnt connected to an account');
        }

        const output: AccountAuthenticatedOutputDto = {
            id: account.id
        }

        return output
    }
    
    public async increaseAccountBalance(amount: Decimal, accountId: string): Promise<Decimal> {
        const account = await this.repository.findById(accountId);

        if(!account) {
            throw new Error("User not found")
        }
        
        account.increaseAccountBalance(amount);

        await this.repository.update(account);

        return account.balance;
    }

    public async decreaseAccountBalance(amount: Decimal, accountId: string): Promise<Decimal> {
        const account = await this.repository.findById(accountId);

        if(!account) {
            throw new Error("User not found")
        }
        
        account.decreaseAccountBalance(amount);

        await this.repository.update(account);

        return account.balance;
    }

    public async getBalance(accountId: string): Promise<Decimal> {
        const account = await this.repository.findById(accountId);

        if(!account) {
            throw new Error("User not found")
        }

        return account.balance
    }
}