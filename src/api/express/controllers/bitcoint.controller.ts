import { Request, Response } from "express";
import { BitcoinClientImplementation } from "../../../client/bitcoin/mercadobitcoin/bitcoin.client.mercadobitcoin";
import { BitcoinServiceImplementation } from "../../../services/bitcoin/implementation/bitcoin.service.implementation";
import { numberFormatterBRL } from "../../../util/numberFormatter.util";

export class BitcoinController {
    private constructor(){}

    public static build(){
        return new BitcoinController;
    }


    public async getPrice(request: Request, response: Response) {
        const aClient = BitcoinClientImplementation.build();
        const aService = BitcoinServiceImplementation.build(aClient);

        const bitcoinPrice = await aService.getBitcoinPrice();

        const { buy, sell} = bitcoinPrice;

        const data = {
            buy: numberFormatterBRL(Number(buy)),
            sell: numberFormatterBRL(Number(sell))
        };

        response.status(200).json(data).send();
    }
}