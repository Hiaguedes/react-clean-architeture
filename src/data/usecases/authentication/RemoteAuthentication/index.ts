import { Authentication, AuthenticationParams } from "@src/domain/authenticator/authenticator";
import { AccountModel } from "@src/domain/models/AccountModel";
import { HttpPostClient } from "@src/data/protocols/http/HttpPostClient";
import { HttpStatusCode } from "@src/data/protocols/http/httpResponse";
import { UnexpectedError, InvalidCredentialsError } from "@src/domain/errors";

export class RemoteAuthentication implements Authentication {
    constructor (
        private readonly url: string,
        private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>
        ) {}

    async auth(params: AuthenticationParams): Promise<AccountModel> {

        const response = await this.httpClient.post({
            url: this.url,
            body: {
                ...params
            }
        });

        switch(response.statusCode) {
            case HttpStatusCode.ok: break;
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError();
            default: throw new UnexpectedError();
        }

        return Promise.resolve({
            accessToken: '11111111',
        })
    }
}