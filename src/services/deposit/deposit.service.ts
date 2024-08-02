import { Decimal } from "@prisma/client/runtime/library";
import { Deposit } from "../../entities/deposit";
import { Account } from "../../entities/account";

export type CreateDepositOutputDto = {
    id: string
    amount: Decimal
    balance: Decimal
    createdAt: string
};

export interface DepositService {
    create(deposit: Deposit, account: Account): Promise<CreateDepositOutputDto>;
    updateEmailSentStatus(idDeposit: string): Promise<void>;
}