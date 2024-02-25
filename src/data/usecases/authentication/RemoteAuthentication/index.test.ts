import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from ".";
import { HttpClassSpy } from '../../../../data/protocols/http/HttpPostClient/mock';

const makeSut = (url = 'fake_url') => {
    const httpClient = new HttpClassSpy();
    const AuthenticationSUT = new RemoteAuthentication(url, httpClient);

    return {
        httpClient,
        sut: AuthenticationSUT,
    }
};

describe('RemoteAuthentication', () => {

    test('should call HttpClient with correct URL', async () => {

        const url = faker.internet.url();

        const { httpClient, sut } = makeSut(url);

        await sut.auth({
            email: faker.internet.email(),
            password: faker.internet.password(),
        })

        expect(httpClient.url).toBe(url)
    })
})