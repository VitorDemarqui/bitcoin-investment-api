import { Deposit } from "../../entities/deposit";

export interface DepositRepository {
    save(deposit: Deposit): Promise<Deposit>;
}