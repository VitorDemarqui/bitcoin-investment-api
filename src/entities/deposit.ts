import { Decimal } from "@prisma/client/runtime/library";

export type DepositProps = {
    id:         string;
    amount:     Decimal;
    createdAt: string
    accountId: string;
}

export class Deposit {
    private constructor(readonly props: DepositProps){}

    public static create(amount: Decimal, accountId: string) {
        return new Deposit({
            id: "",
            amount,
            createdAt: "",
            accountId: accountId
        })
    }

    public static with(id: string, amount: Decimal, createdAt: string, accountId: string) {
        return new Deposit({
            id,
            amount,
            createdAt,
            accountId
        })
    }

    public get id() {
        return this.props.id
    }

    public get amount() {
        return this.props.amount
    }

    public get createdAt() {
        return this.props.createdAt
    }

    public get accountId() {
        return this.props.accountId
    }
}