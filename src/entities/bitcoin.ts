export type BitcoinProps = {
    high: string,
    low: string
    vol: string,
    last: string,
    buy: string,
    sell: string,
    open: string,
    date: Date,
    pair: string
}

export class Bitcoin {
    private constructor(readonly props: BitcoinProps){}

    public static with(high: string, low: string, vol: string, last: string, buy: string,
        sell: string, open: string, date: Date, pair: string) {
        return new Bitcoin({
            high,
            low,
            vol,
            last,
            buy,
            sell,
            open,
            date,
            pair
        })
    }

    public get high(): string {
        return this.props.high;
    }

    public get low(): string {
        return this.props.low;
    }

    public get vol(): string {
        return this.props.vol;
    }

    public get last(): string {
        return this.props.last;
    }

    public get buy(): string {
        return this.props.buy;
    }

    public get sell(): string {
        return this.props.sell;
    }

    public get open(): string {
        return this.props.open;
    }

    public get date(): Date {
        return this.props.date;
    }

    public get pair(): string {
        return this.props.pair;
    }
}