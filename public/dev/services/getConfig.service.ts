import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Injectable()
export class ConfigService {
    constructor(private http: Http) {}

    getConfig() {
        return this.http.get('/config.json')
            .toPromise()
            .then(res => <any[]> res.json(), this.handleError);
    }

    private handleError(error: any) {
        console.log(error);
        return Promise.reject(error.message || error.json().error);
    }
}