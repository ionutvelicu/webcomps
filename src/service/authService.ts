import environment from '../environment';
import { uuid } from "../utils/utils";
import { TOKEN } from '../utils/constants';
import axios, {AxiosResponse} from "axios";

export default class AuthService {

    public static login(name: string, password: string): Promise<AxiosResponse> {
        return axios.post(`${environment.basePath}${PATHS.LOGIN}?name=${name}`, {}, {
            headers: {
                'jart-client-machine-id': uuid(),
                'j_mandant': '500010',
                'authorization': 'basic ' + btoa(`${name}:${password}`)
            }
        });

        // return fetch(`${environment.basePath}${PATHS.LOGIN}?name=${name}`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'jart-client-machine-id': uuid(),
        //         'j_mandant': '500010',
        //         'authorization': 'basic ' + btoa(`${name}:${password}`)
        //     }
        // })
    }

    public static storeToken(token: string) {
        localStorage.setItem(TOKEN, token);
    }

    public static getToken(): string {
        return localStorage.getItem(TOKEN);
    }
}

enum PATHS {
    LOGIN = "/login"
}
