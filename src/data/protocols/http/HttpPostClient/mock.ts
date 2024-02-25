import { HttpPostClient, HttpPostParams } from ".";

export class HttpClassSpy implements HttpPostClient {
    url?: string;

    async post(params: HttpPostParams): Promise<void> {
        this.url = params.url;
        return Promise.resolve()
    }
}