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
    googleStreetViewSrcs: any[] = [];
    checkedDockerId: number = -1;

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
                styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#707070"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#be2026"},{"lightness":"0"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"hue":"#ff000a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"saturation":"-52"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
                disableDefaultUI: true
            }
        );

        this.connection = io(this.config.connections.dataServer.server + ':' + this.config.connections.dataServer.port);
        this.connection.on('docker', (data) => {

            data.forEach((item) => {
                //console.log(item);

                if (!this.markers[item.clientId]) {
                    var icon = {
                        url: this.config.markerIcon
                    };

                    this.markers[item.clientId] = new google.maps.Marker({
                        position: new google.maps.LatLng(item.data[0].position.latitude, item.data[0].position.longitude),
                        map: this.GMap,
                        icon: icon
                    });

                    this.markers[item.clientId].addListener('click', () => {
                        this.checkedDockerId = item.clientId;
                    });
                } else if (item.data[0].position.latitude != this.markers[item.clientId].getPosition().lat() && item.data[0].position.longitude != this.markers[item.clientId].getPosition().lng()) {
                    this.updateGoogleStreetViewSrc(item.clientId, item);
                    this.markers[item.clientId].setPosition(new google.maps.LatLng(item.data[0].position.latitude, item.data[0].position.longitude));
                }

                if (!this.dockers[item.clientId]) {
                    this.dockers[item.clientId] = {
                        clientId: item.clientId,
                        ip: item.data[0].metadata.ip,
                        dockerType: item.data[0].metadata.dockerType,
                        bearing: item.data[0].position.bearing,
                    };
                }

                if (!this.googleStreetViewSrcs[item.clientId] || this.dockers[item.clientId].bearing != item.data[0].position.bearing) {
                    this.updateGoogleStreetViewSrc(item.clientId, item);
                }

            });

        });

    }

    updateGoogleStreetViewSrc(clientId: number, item: any): void {
        this.googleStreetViewSrcs[clientId] = 'https://maps.googleapis.com/maps/api/streetview?size='
            + this.config.imageSize.width + 'x' + this.config.imageSize.height + '&location='
            + item.data[0].position.latitude + ','
            + item.data[0].position.longitude + '&heading='
            + item.data[0].position.bearing + '&pitch=-0.76&key='
            + this.config.googleStreetViewAPIKey;
        console.log(item.data[0].position.bearing);
    }

    closePopup(): void {
        this.checkedDockerId = -1;
    }

}