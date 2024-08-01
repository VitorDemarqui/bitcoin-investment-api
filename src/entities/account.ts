import bcrypt from "bcrypt";
import { BadRequestError } from "../helpers/api-errors.helper";

export type AccountProps = {
    id: string;
    name: string;
	email: string;
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
            createdAt: "",
            password: password
        })
    }

    public static with(id: string, name: string, email: string, createdAt: string, password: string) {
        return new Account({
            id,
            name,
            email,
            createdAt,
            password
        })
    }

    public static formatCreateAccountValues(id: string, name: string, email: string, createdAt: string, password: string) {
        return new Account({
            id: "",
            name,
            email: email.toLowerCase(),
            createdAt: "",
            password: bcrypt.hashSync(password, 10)
        })
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

    public get createdAt() {
        return this.props.createdAt
    }

    public get password() {
        return this.props.password
    }
}