import { Decimal } from "@prisma/client/runtime/library";

export type InvestmentProps = {
    id: string;
    investedAmount: Decimal;
    btcQuantity: Decimal;
    purchaseRate: Decimal;
    createdAt: string;
    accountId: string;
}

export class Investment {
    private constructor(readonly props: InvestmentProps){}

    public static create(investedAmount: Decimal, btcQuantity: Decimal, purchaseRate: Decimal, accountId: string) {
        return new Investment({
            id: "",
            investedAmount,
            btcQuantity,
            purchaseRate,
            createdAt: "",
            accountId
        })
    }

    public static with(id: string, investedAmount: Decimal, btcQuantity: Decimal, purchaseRate: Decimal, createdAt: string, accountId: string) {
        return new Investment({
            id,
            investedAmount,
            btcQuantity,
            purchaseRate,
            createdAt,
            accountId
        })
    }

    public get id() {
        return this.props.id
    }

    public get investedAmount() {
        return this.props.investedAmount
    }

    public get btcQuantity() {
        return this.props.btcQuantity
    }

    public get purchaseRate() {
        return this.props.purchaseRate
    }

    public get createdAt() {
        return this.props.createdAt
    }

    public get accountId() {
        return this.props.accountId
    }
}