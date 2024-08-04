import { Decimal } from "@prisma/client/runtime/library";
import { Account } from "../../entities/account";
import { Investment } from "../../entities/investment";

export type CreateInvestmentOutputDto = {
    id: string
    balance: Decimal,
    investedAmount: Decimal
    btcQuantity: Decimal
    purchaseRate: Decimal
    createdAt: string
};

export interface InvestmentService {
    create(investment: Investment, account: Account): Promise<CreateInvestmentOutputDto>;
}