import { Investment } from "../../entities/investment";

export interface InvestmentRepository {
    save(investment: Investment): Promise<Investment>;
    update(investment: Investment): Promise<void>;
    findByIdAccount(id: string): Promise<Investment[]>;
}