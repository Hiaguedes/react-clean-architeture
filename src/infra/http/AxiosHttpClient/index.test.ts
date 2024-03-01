import { faker } from "@faker-js/faker";
import { AxiosHttpClient } from '.'
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {

    const AxiosSut = () => {
        const url = faker.internet.url();
        const sut = new AxiosHttpClient();
        return {
            sut,
            url,
        }
    }

    test('should call axios with correct URL', async () => {
        
        const { sut, url } = AxiosSut();

        sut.post({
            url,
        })

        expect(mockedAxios).toHaveBeenCalledWith(url)
    })
})