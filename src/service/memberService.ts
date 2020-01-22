import environment from '../environment';
import { TOKEN } from '../utils/constants';
import axios, {AxiosResponse} from 'axios';

export default class MemberService {

    public static getList(query?: string): Promise<AxiosResponse> {
        document.cookie = `JSESSIONID=${this.getToken()};domain=nhcone.kronsoft.ro;path=/;SameSite=None`

        return axios.post(`${environment.basePath}${PATHS.SEARCH}/0/99`, {
            offset: 0,
            limit: 99,
            searchString: '',
            needPhoto: true,
            filter: "FIND_ALL",
            hasPatientRisk: false,
            showActive: true,
            sort: "SORT_NAME",
            tableOrderBy: "PATIENTLISTVIEW_LASTNAME",
            tableOrderDirection: "UP",
            cType: "PatientSearchCriteriaOne",
            intNrOrName: query || ''
        }, {
            withCredentials: true,
            headers: {
            }
        });
    }

    private static getToken(): string {
        return localStorage.getItem(TOKEN);
    }
}

enum PATHS {
    SEARCH = '/patientOne/patientSearch'
}
