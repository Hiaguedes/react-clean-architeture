import { faker } from "@faker-js/faker";
import { AxiosHttpClient } from '.'
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {

    const AxiosSut = () => {
        const url = faker.internet.url();
        const sut = new AxiosHttpClient<any, void>();
        return {
            sut,
            url,
        }
    }

    test('should call axios with correct URL and correct post method', async () => {
        
        const { sut, url } = AxiosSut();

        sut.post({
            url,
        })

        expect(mockedAxios.post).toHaveBeenCalledWith(url, undefined)
    })

    test('should call axios with correct body', async () => {
        
        const { sut, url } = AxiosSut();
        const mockBody = {
            prop1: faker.animal.bear(),
            prop2: faker.internet.exampleEmail(),
        }

        sut.post({
            url,
            body: mockBody
        })

        expect(mockedAxios.post).toHaveBeenCalledWith(url, mockBody)
    })
})