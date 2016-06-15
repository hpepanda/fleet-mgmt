import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './getconfig.service';

@Injectable()
export class ConnectionService {
    connectionObservable: any;
    http: Http;
    config: any;
    connections: any[] = [];

    constructor(http: Http, private _configService: ConfigService) {
        this.http = http;

        this._configService.configObservable.subscribe((config) => {
            this.config = config;
            this.connect();
        });
    }

    connect(): void {
        this.connectionObservable = Observable.create((observer) => {
            this.config.connections.forEach((item) => {
                let ws = io(item.server + ':' + item.port);

                ws.on('docker', (data) => {
                    observer.next({data: data, source: item.server});
                });

                ws.on('close', () => ws.close());
            });
        });

    }
}