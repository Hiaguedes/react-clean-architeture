import { HttpPostClient, HttpPostParams, HttpResponse } from "@src/data/protocols/http";
import axios from 'axios';

export class AxiosHttpClient<T, R> implements HttpPostClient<T, R> {

    async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
        const response = await axios.post(params.url, params.body)
        return {
            statusCode: response.status,
            body: response.data,
        }
    }

}