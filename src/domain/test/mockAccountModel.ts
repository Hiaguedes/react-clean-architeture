import { faker } from "@faker-js/faker";
import { AccountModel } from "../models/AccountModel";

export const mockAccountModel: AccountModel = {
    accessToken: faker.string.uuid(),
} 