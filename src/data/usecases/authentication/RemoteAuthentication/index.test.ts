import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from ".";
import { HttpClassSpy } from '@src/data/protocols/http/HttpPostClient/mock';
import { mockAuthentication } from '@src/domain/authenticator/mock';
import { InvalidCredentialsError } from '@src/domain/errors/InvalidCredentialsError';
import { HttpStatusCode } from '@src/data/protocols/http/httpResponse';

const makeSut = (url = 'fake_url') => {
    const httpClient = new HttpClassSpy();
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
})