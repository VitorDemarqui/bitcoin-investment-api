import { Decimal } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

export type AccountProps = {
    id: string;
    name: string;
	email: string;
    balance: Decimal;
    createdAt: string;
	password: string;
}

export class Account {
    private constructor(readonly props: AccountProps){}

    public static create(name: string, email: string, password: string) {
        return new Account({
            id: "",
            name,
            email,
            balance: new Decimal(0.00),
            createdAt: "",
            password: password
        })
    }

    public static with(id: string, name: string, email: string, balance: Decimal, createdAt: string, password: string) {
        return new Account({
            id,
            name,
            email,
            balance,
            createdAt,
            password
        })
    }

    public static formatCreateAccountValues(id: string, name: string, email: string, createdAt: string, password: string) {
        return new Account({
            id,
            name,
            email: email.toLowerCase(),
            balance: new Decimal(0.00),
            createdAt: createdAt,
            password: bcrypt.hashSync(password, 10)
        })
    }

    public increaseAccountBalance(amount: Decimal) {
        if(new Decimal(0).gte(amount)) {
            throw new Error("Amount must be grather than zero")
        }
        
        this.props.balance = this.props.balance.plus(amount);
    }

    public decreaseAccountBalance(amount: Decimal) {
        if(new Decimal(0).gte(amount)) {
            throw new Error("Amount must be grather than zero")
        }
        
        this.props.balance = this.props.balance.minus(amount);
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get email() {
        return this.props.email
    }

    public get balance() {
        return this.props.balance
    }

    public get createdAt() {
        return this.props.createdAt
    }

    public get password() {
        return this.props.password
    }
}