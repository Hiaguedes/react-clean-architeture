import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from ".";
import { HttpClassSpy } from '../../../../data/protocols/http/HttpPostClient/mock';
import { mockAuthentication } from '../../../../domain/authenticator/mock';

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
})