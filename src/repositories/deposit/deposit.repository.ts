import { Deposit } from "../../entities/deposit";

export interface DepositRepository {
    save(deposit: Deposit): Promise<Deposit>;
    update(deposit: Deposit): Promise<void>;
    findById(id: string): Promise<Deposit>;
}