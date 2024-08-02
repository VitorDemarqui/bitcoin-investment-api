import { Account } from "../../entities/account";

export interface AccountRepository {
    save(account: Account): Promise<Account>;
    update(account: Account): Promise<void>;
    findById(id: string): Promise<Account>;
    findByEmail(email: string): Promise<Account|null>;
}