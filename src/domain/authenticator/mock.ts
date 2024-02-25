import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "./authenticator";

export const mockAuthentication: AuthenticationParams = {
    email: faker.internet.email(),
    password: faker.internet.password(),
}