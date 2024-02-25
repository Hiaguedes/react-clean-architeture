import { HttpPostClient, HttpPostParams } from ".";
import { HttpResponse, HttpStatusCode } from "../httpResponse";

export class HttpClassSpy implements HttpPostClient {
    url?: string;
    body?: any;
    response: HttpResponse = {
        statusCode: HttpStatusCode.ok
    }

    async post(params: HttpPostParams): Promise<HttpResponse> {
        this.url = params.url;
        this.body = params?.body;
        
        return Promise.resolve(this.response)
    }
}