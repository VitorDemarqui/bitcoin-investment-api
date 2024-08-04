import { Decimal } from "@prisma/client/runtime/library";
import { BitcoinClient } from "../../../client/bitcoin/bitcoin.client";
import { ServiceUnavailableError } from "../../../util/api-errors.util";
import { BitcoinPriceOutputDto, BitcoinService } from "../bitcoin.service";

export class BitcoinServiceImplementation implements BitcoinService {
    private constructor(readonly client: BitcoinClient){}

    public static build(client: BitcoinClient) {
        return new BitcoinServiceImplementation(client);
    }

    public async getBitcoinPrice(): Promise<BitcoinPriceOutputDto> {
        const bitcoinStatus = await this.client.getBitcoinStatus();
        
        if(!bitcoinStatus) {
            throw new ServiceUnavailableError("Call with external api returned error");
        }

        const { buy, sell } = bitcoinStatus

        const output: BitcoinPriceOutputDto = {
            buy,
            sell
        }

        return output;
    }

    public getQtyBitcoinPurchased(amount: Decimal, sellValue: Decimal): Decimal {
        console.log(Number(amount) / Number(sellValue))
        const purchasedBitcoin = Decimal.div(amount, sellValue)

        console.log(purchasedBitcoin)
        return purchasedBitcoin;
    }
}