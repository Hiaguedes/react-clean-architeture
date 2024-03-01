import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from ".";
import { HttpClassSpy , HttpStatusCode} from '@src/data/protocols/http';
import { mockAuthentication } from '@src/domain/authenticator/mock';
import { UnexpectedError, InvalidCredentialsError } from '@src/domain/errors';
import { AuthenticationParams } from '@src/domain/authenticator/authenticator';
import { AccountModel } from '@src/domain/models/AccountModel';
import { mockAccountModel } from '@src/domain/test/mockAccountModel';

const makeSut = (url = 'fake_url') => {
    const httpClient = new HttpClassSpy<AuthenticationParams, AccountModel>();
    const AuthenticationSUT = new RemoteAuthentication(url, httpClient);

    return {
        httpClient,
        sut: AuthenticationSUT,
    }
};

describe('RemoteAuthentication', () => {

    test('should call httpPostClient with correct URL', async () => {

        const url = faker.internet.url();

        const { httpClient, sut } = makeSut(url);

        await sut.auth(mockAuthentication)

        expect(httpClient.url).toBe(url)
    })

    test('shoud call httpClient post with correct body', async () => {

        const { httpClient, sut } = makeSut();

        await sut.auth(mockAuthentication);

        expect(httpClient.body).toMatchObject(mockAuthentication)
    })

    test('should throw error if httpClient returns 401', async () => {

        const { httpClient, sut } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.unauthorized,
        }
        const promise = sut.auth(mockAuthentication);

        expect(promise).rejects.toThrow(new InvalidCredentialsError())

    })

    test('should throw unexpected error if httpClient return 400', () => {
        const { httpClient, sut } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.badRequest,
        }
        const promise = sut.auth(mockAuthentication);

        expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('should throw unexpected error if httpClient return 500', () => {
        const { httpClient, sut } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.serverError,
        }
        const promise = sut.auth(mockAuthentication);

        expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('should throw unexpected error if httpClient return 404', () => {
        const { httpClient, sut } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.notFound,
        }
        const promise = sut.auth(mockAuthentication);

        expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('should return accontModel if httpClient return 200', async () => {
        const { httpClient, sut } = makeSut();

        const httpResult = mockAccountModel;

        httpClient.response = {
            statusCode: HttpStatusCode.ok,
            body: mockAccountModel
        }
        const account = await sut.auth(mockAuthentication);

        expect(account).toEqual(httpResult)
    })
})