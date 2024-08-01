import { Account } from "../../entities/account";


export type CreateAccountOutputDto = {
    id: string
    name: string;
	email: string;
    createdAt: string
}

export interface AccountService {
    create(account: Account): Promise<CreateAccountOutputDto>  
}