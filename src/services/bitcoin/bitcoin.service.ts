
export type BitcoinPriceOutputDto = {
    buy: string,
    sell: string
};

export interface BitcoinService {
    getBitcoinPrice(): Promise<BitcoinPriceOutputDto>;
}