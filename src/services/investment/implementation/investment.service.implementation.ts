import { Decimal } from "@prisma/client/runtime/library";
import { BitcoinClientImplementation } from "../../../client/bitcoin/mercadobitcoin/bitcoin.client.mercadobitcoin";
import { Account } from "../../../entities/account";
import { Investment } from "../../../entities/investment";
import Queue from "../../../lib/Queue";
import { AccountRepositoryPrisma } from "../../../repositories/account/prisma/account.repository.prisma";
import { InvestmentRepository } from "../../../repositories/investment/investment.repository";
import { prisma } from "../../../util/prisma.util";
import { AccountServiceImplementation } from "../../account/implementation/account.service.implementation";
import { BitcoinServiceImplementation } from "../../bitcoin/implementation/bitcoin.service.implementation";
import { CreateInvestmentOutputDto, InvestmentService, PositionInvestmentOutputDto } from "../investment.service.implementation";
import { decimalFormatterBRL } from "../../../util/numberFormatter.util";
import { BadRequestError } from "../../../util/api-errors.util";

export class InvestmentServiceImplementation implements InvestmentService {
    private constructor(readonly repository: InvestmentRepository){}

    public static build(repository: InvestmentRepository) {
        return new InvestmentServiceImplementation(repository);
    }

    public async create(investment: Investment, account: Account): Promise<CreateInvestmentOutputDto> {
        const aRepository = AccountRepositoryPrisma.build(prisma);
        const accountService = AccountServiceImplementation.build(aRepository);
        const bitcoinClient = BitcoinClientImplementation.build();
        const bitcoinService = BitcoinServiceImplementation.build(bitcoinClient);

        const { investedAmount } = investment;
        const accountId = account.id;
        const accountEmail = account.email;

        const balance = await accountService.getBalance(accountId);

        if(balance < investedAmount) {
            throw new BadRequestError("Amount greater than balance!")
        }

        const bitcoinValue = await bitcoinService.getBitcoinPrice();
        const bitcointSellValue = new Decimal(bitcoinValue.sell)
        const qtyBitcoinPurchased = bitcoinService.getQtyBitcoinPurchased(investedAmount, bitcointSellValue);

        const aInvestment = Investment.create(investedAmount, qtyBitcoinPurchased, bitcointSellValue, accountId);
        const newInvestment = await this.repository.save(aInvestment);

        const newBalance = await accountService.decreaseAccountBalance(investedAmount, accountId);

        await Queue.add('RegistrationMail', { 
            id: newInvestment.id,
            email: accountEmail,
            subject: 'Seu Investimento foi processado com sucesso!',
            text: 'Você investiu com sucesso ' + decimalFormatterBRL(investedAmount) + '.'
        })

        const output: CreateInvestmentOutputDto = {
            id: newInvestment.id,
            balance: newBalance,
            investedAmount,
            btcQuantity: qtyBitcoinPurchased,
            purchaseRate: bitcointSellValue,
            createdAt: newInvestment.createdAt
        };

        return output;
    }
    
    public async getPosition(account: Account): Promise<PositionInvestmentOutputDto[]> {
        const bitcoinClient = BitcoinClientImplementation.build();
        const bitcoinService = BitcoinServiceImplementation.build(bitcoinClient);

        const bitcointPrice = await bitcoinService.getBitcoinPrice();

        const investments = await this.repository.findByIdAccount(account.id);

        const output: PositionInvestmentOutputDto[] = investments.map((investment) => {
            const variation = Decimal
                .sub(bitcointPrice.buy, investment.purchaseRate)
                .div(investment.purchaseRate)
                .mul(100)
                .toFixed(8);    

            const currentValue = Decimal
                .mul(investment.btcQuantity, bitcointPrice.buy)
                .toFixed(8);

            return {
                id: investment.id,
                amount: investment.investedAmount,
                purchaseRate: investment.purchaseRate,
                variation: variation.includes("-") ? variation : "+" + variation  + "%",
                currentValue,
                purchaseDate: investment.createdAt.toString(),
            };
        })

        return output;
    }
}