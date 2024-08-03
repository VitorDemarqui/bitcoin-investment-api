import axios from 'axios';

import { Bitcoin } from "../../../entities/bitcoin";
import { BitcoinClient } from "../bitcoin.client";

export class BitcoinClientImplementation implements BitcoinClient {
    public static build() {
        return new BitcoinClientImplementation();
    }

    public async getBitcoinStatus(): Promise<Bitcoin | undefined> {
        return axios.get("https://www.mercadobitcoin.net/api/BTC/ticker/")
            .then((response) => {
                const data = response.data;
                const { high, low, vol, last, buy, sell, open, date, pair } = data.ticker;
                
                return Bitcoin.with(high, low, vol, last, buy, sell, open, date, pair);
            })
            .catch(function (error) {
                console.error('Error fetching data: ', error);
                throw error;
            });
    }
}