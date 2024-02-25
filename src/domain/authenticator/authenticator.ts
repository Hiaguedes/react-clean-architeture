import { AccountModel } from "domain/models/AccountModel"

type AuthParams = {
    email: string,
    password: string,
}

export interface Authentication {
auth (params: AuthParams): Promise<AccountModel>
}