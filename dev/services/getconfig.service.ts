import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http";

@Injectable()
export class ConfigService {
    configObservable: any;
    http: Http;

    constructor(http: Http) {
        this.http = http;
        this.configObservable = this.http.get('/config.json').map((response) => {
            return JSON.parse(response._body);
        });
    }
}