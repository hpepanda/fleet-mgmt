import {HTTP_PROVIDERS} from 'angular2/http';
import {Component} from 'angular2/core';
import {ConfigService} from '../services/getConfig.service';

@Component({
    selector: 'docker-app',
    templateUrl: 'dev/templates/docker-app.template.html',
    providers: [HTTP_PROVIDERS, ConfigService]
})

export class DockerAppComponent {

    config: any;
    error: any;
    GMmap: any;
    connection: any;
    dockers: any[] = [];
    markers: any[] = [];
    checkedDocker: any = {};

    constructor(private _configService: ConfigService) {
        this._configService.getConfig().then((config) => {
            this.config = config;
            this.getConfigCallback();
        }, (error) => {
            this.error = error;
        });
    }

    getConfigCallback(): void {

        // Init map
        this.GMap = new google.maps.Map(
            document.getElementById(this.config.mapDivElId),
            {
                center: new google.maps.LatLng(this.config.mapCenter.lat, this.config.mapCenter.lng),
                zoom: this.config.mapZoom,
                styles: this.config.mapStyle,
                disableDefaultUI: true
            }
        );

        this.connection = io(this.config.connections.dataServer.server + ':' + this.config.connections.dataServer.port);
        this.connection.on('docker', (data) => {

            data.forEach((item) => {
                this.registerDocker(item);
            });

        });

    }

    registerDocker(docker: any): void {
        this.dockers[docker.clientId] = docker;

        if (!this.markers[docker.clientId]) {
            var icon = {
                url: this.config.markerIcon
            };

            this.markers[docker.clientId] = new google.maps.Marker({
                position: new google.maps.LatLng(this.dockers[docker.clientId].data[0].position.latitude, this.dockers[docker.clientId].data[0].position.longitude),
                map: this.GMap,
                icon: icon,
                title: docker.clientId
            });

            this.markers[docker.clientId].addListener('click', () => {
                this.checkedDocker = this.dockers[docker.clientId];
            });
        }

        if (docker.data[0].position.latitude != this.markers[docker.clientId].getPosition().lat() && docker.data[0].position.longitude != this.markers[docker.clientId].getPosition().lng()) {
            this.markers[docker.clientId].setPosition(new google.maps.LatLng(docker.data[0].position.latitude, docker.data[0].position.longitude));
        }

    }

    closePopup(): void {
        this.checkedDocker = {};
    }

}