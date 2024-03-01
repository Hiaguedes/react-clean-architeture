import { HttpPostClient, HttpPostParams, HttpResponse } from "@src/data/protocols/http";
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, void> {

    async post(params: HttpPostParams<any>): Promise<HttpResponse<void>> {
        await axios(params.url)
        return {
            statusCode: 200,
        }
    }

}