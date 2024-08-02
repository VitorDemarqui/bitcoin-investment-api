import { Decimal } from "@prisma/client/runtime/library";
import { Account } from "../../entities/account";


export type CreateAccountOutputDto = {
    id: string
    name: string;
	email: string;
    createdAt: string
};

export type AccountAuthenticatedOutputDto = {
    id: string
};

export interface AccountService {
    create(account: Account): Promise<CreateAccountOutputDto>;
    validateCredentials(email: string, password: string): Promise<AccountAuthenticatedOutputDto>;
    increaseAccountBalance(amount: Decimal, accountId: string): Promise<Decimal> ;
}