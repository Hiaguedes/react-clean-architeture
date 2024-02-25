export class UnexpectedError extends Error {
    constructor() {
        super('Aconteceu um erro inesperado! Tente novamente em breve')
        this.name = "UnexpectedError"
    }
}