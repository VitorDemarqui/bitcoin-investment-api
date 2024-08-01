import bcrypt from "bcrypt";

import { Account } from "../../../entities/account";
import { AccountService, CreateAccountOutputDto } from "../account.service";
import { AccountRepository } from "../../../repositories/account/account.repository";
import { BadRequestError } from "../../../helpers/api-errors.helper";

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
            name: name,
            email: email,
            createdAt: newAccount.createdAt
        };

        return output;
    }

    public async validateCredentials(email: string, password: string): Promise<void> {
        const account = await this.repository.findByEmail(email);

        if(!account) {
            throw new BadRequestError('The email/password you entered isnt connected to an account');
        }

        const passwordIsValid = bcrypt.compareSync(password, account.password);

        if(!passwordIsValid) {
            throw new BadRequestError('The email/password you entered isnt connected to an account');
        }
    }
    
}