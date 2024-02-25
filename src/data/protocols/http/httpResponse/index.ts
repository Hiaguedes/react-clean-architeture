export enum HttpStatusCode {
    unauthorized = 401,
    noContent = 204,
    badRequest = 400,
    ok = 200,
    serverError = 500,
    notFound = 404,
}

export type HttpResponse = {
    statusCode: number;
    body?: any;
}