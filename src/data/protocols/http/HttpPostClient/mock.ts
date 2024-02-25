import { HttpPostClient, HttpPostParams } from ".";

export class HttpClassSpy implements HttpPostClient {
    url?: string;
    body?: any;

    async post(params: HttpPostParams): Promise<void> {
        this.url = params.url;
        this.body = params?.body;
        
        return Promise.resolve()
    }
}