import { HttpPostClient, HttpPostParams } from ".";
import { HttpResponse, HttpStatusCode } from "../httpResponse";
export class HttpClassSpy<T,R> implements HttpPostClient<T, R> {
    url?: string;
    body?: any;
    response: HttpResponse<R> = {
        statusCode: HttpStatusCode.ok,
    }

    async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
        this.url = params.url;
        this.body = params?.body;
        
        return Promise.resolve(this.response)
    }
}