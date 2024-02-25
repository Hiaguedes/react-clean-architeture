export enum HttpStatusCode {
    unauthorized = 401,
    noContent = 204,
}

export type HttpResponse = {
    statusCode: number;
    body?: any;
}