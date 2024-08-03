import { Bitcoin } from "../../entities/bitcoin";


export interface BitcoinClient {
    getBitcoinStatus(): Promise<Bitcoin | undefined>;
}