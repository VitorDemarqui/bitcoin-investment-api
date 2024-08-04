import { Decimal } from "@prisma/client/runtime/library";

export type BitcoinPriceOutputDto = {
    buy: string,
    sell: string
};

export interface BitcoinService {
    getBitcoinPrice(): Promise<BitcoinPriceOutputDto>;
    getQtyBitcoinPurchased(amount: Decimal, sellValue: Decimal): Decimal;
}