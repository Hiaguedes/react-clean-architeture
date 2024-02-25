import { Authentication } from "domain/authenticator/authenticator";
import { AccountModel } from "domain/models/AccountModel";
import { HttpPostClient } from "data/protocols/http/HttpPostClient";

export class RemoteAuthentication implements Authentication {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpPostClient
        ) {}

    async auth(params: { email: string; password: string; }): Promise<AccountModel> {
        console.log(params)

        await this.httpClient.post({
            url: this.url,
        });

        return Promise.resolve({
            accessToken: '11111111'
        })
    }
}