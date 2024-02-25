import { faker } from '@faker-js/faker'
import { RemoteAuthentication } from ".";

interface HttpPostClient {
    post (url: string): Promise<void>
}

describe('RemoteAuthentication', () => {
    test('should call HttpClient with correct URL', async () => {

        class HttpClassSpy implements HttpPostClient {
            url?: string;
            async post(url: string): Promise<void> {
                this.url = url;
                return Promise.resolve()
            }
        }

        const url = faker.internet.url();
        const httpClient = new HttpClassSpy();
        const AuthenticationSUT = new RemoteAuthentication(url, httpClient);

        await AuthenticationSUT.auth({
            email: faker.internet.email(),
            password: faker.internet.password(),
        })

        expect(httpClient.url).toBe(url)
    })
})