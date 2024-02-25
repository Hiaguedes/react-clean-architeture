import { Authentication, AuthenticationParams } from "@src/domain/authenticator/authenticator";
import { AccountModel } from "@src/domain/models/AccountModel";
import { HttpPostClient } from "@src/data/protocols/http/HttpPostClient";

export class RemoteAuthentication implements Authentication {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpPostClient
        ) {}

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        console.log(params)

        await this.httpClient.post({
            url: this.url,
            body: {
                ...params
            }
        });

        return Promise.resolve({
            accessToken: '11111111'
        })
    }
}