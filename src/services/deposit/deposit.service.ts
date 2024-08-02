import { Decimal } from "@prisma/client/runtime/library";
import { Deposit } from "../../entities/deposit";

export type CreateDepositOutputDto = {
    id: string
    amount: Decimal
    createdAt: string
};

export interface DepositService {
    create(account: Deposit): Promise<CreateDepositOutputDto>;
}