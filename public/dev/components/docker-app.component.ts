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
    dockers: any = {};
    markers: any = {};
    markerActive: string;
    googleStreetViewSrcs: any = {};
    providers: any = {};
    providerKeys: string[] = [];
    checkedDockerId: number = null;
    dockerKeys: string[] = [];

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
            var processedIds = [];

            data.forEach((item) => {
                processedIds.push(item.clientId);

                if (!this.markers['item' + item.clientId]) {

                    if (!this.providers[item.data[0].metadata.dockerType]) {
                        this.providers[item.data[0].metadata.dockerType] = {
                            num: 0,
                            icon: this.config.markerIcons.shift(),
                            color: this.config.baseColors.shift()
                        };
                        this.providerKeys = Object.keys(this.providers);
                    }
                    this.providers[item.data[0].metadata.dockerType].num++;

                    var icon = {
                        url: this.providers[item.data[0].metadata.dockerType].icon,
                        scaledSize: this.config.enableWideMarkers ? new google.maps.Size(this.config.markerActive.scaledSize.width, this.config.markerActive.scaledSize.height) : new google.maps.Size(this.config.marker.scaledSize.width, this.config.marker.scaledSize.height),
                        anchor: this.config.enableWideMarkers ? new google.maps.Point(this.config.markerActive.anchor.offsetX, this.config.markerActive.anchor.offsetY) : new google.maps.Point(this.config.marker.anchor.offsetX, this.config.marker.anchor.offsetY)
                    };

                    this.markers['item' + item.clientId] = new google.maps.Marker({
                        position: new google.maps.LatLng(item.data[0].position.latitude, item.data[0].position.longitude),
                        map: this.GMap,
                        icon: icon
                    });

                    this.markers['item' + item.clientId].addListener('click', () => {
                        if (this.markerActive != null) {
                            var icon = {
                                url: this.providers[this.dockers['item' + this.markerActive].dockerType].icon,
                                scaledSize: this.config.enableWideMarkers ? new google.maps.Size(this.config.markerActive.scaledSize.width, this.config.markerActive.scaledSize.height) : new google.maps.Size(this.config.marker.scaledSize.width, this.config.marker.scaledSize.height),
                                anchor: this.config.enableWideMarkers ? new google.maps.Point(this.config.markerActive.anchor.offsetX, this.config.markerActive.anchor.offsetY) : new google.maps.Point(this.config.marker.anchor.offsetX, this.config.marker.anchor.offsetY)
                            };
                            this.markers['item' + this.markerActive].setIcon(icon);
                        }

                        this.checkedDockerId = item.clientId;
                        this.markerActive = item.clientId;
                        var icon = {
                            url: this.config.markerIconActive,
                            scaledSize: new google.maps.Size(this.config.markerActive.scaledSize.width, this.config.markerActive.scaledSize.height),
                            anchor: new google.maps.Point(this.config.markerActive.anchor.offsetX, this.config.markerActive.anchor.offsetY)
                        };
                        this.markers['item' + item.clientId].setIcon(icon);
                    });
                    
                } else if (item.data[0].position.latitude != this.markers['item' + item.clientId].getPosition().lat() && item.data[0].position.longitude != this.markers['item' + item.clientId].getPosition().lng()) {
                    this.updateGoogleStreetViewSrc(item.clientId, item);
                    this.markers['item' + item.clientId].setPosition(new google.maps.LatLng(item.data[0].position.latitude, item.data[0].position.longitude));
                }

                if (!this.dockers['item' + item.clientId]) {
                    this.dockers['item' + item.clientId] = {
                        clientId: item.clientId,
                        ip: item.data[0].metadata.ip,
                        dockerType: item.data[0].metadata.dockerType,
                        bearing: item.data[0].position.bearing
                    };
                    this.updateDockerKeys();
                }

                if (!this.googleStreetViewSrcs['item' + item.clientId] || this.dockers['item' + item.clientId].bearing != item.data[0].position.bearing) {
                    this.updateGoogleStreetViewSrc(item.clientId, item);
                }

            });

            if (processedIds.length < this.dockerKeys.length) {

                this.dockerKeys.forEach((dockerKey) => {
                    if (processedIds.indexOf(this.dockers[dockerKey].clientId) == -1) {
                        if (this.checkedDockerId == this.dockers[dockerKey].clientId) {
                            this.checkedDockerId = null;
                            this.markerActive = null;
                        }
                        this.providers[this.dockers[dockerKey].dockerType].num--;
                        if (!this.providers[this.dockers[dockerKey].dockerType].num) {
                            delete this.providers[this.dockers[dockerKey].dockerType];
                            this.providerKeys = Object.keys(this.providers);
                        }
                        delete this.dockers[dockerKey];
                        this.markers[dockerKey].setMap(null);
                        delete this.markers[dockerKey];
                        delete this.googleStreetViewSrcs[dockerKey];
                    }
                });
                this.updateDockerKeys();

            }

        });

    }

    updateGoogleStreetViewSrc(clientId: number, item: any): void {
        this.googleStreetViewSrcs['item' + clientId] = 'https://maps.googleapis.com/maps/api/streetview?size='
            + this.config.imageSize.width + 'x' + this.config.imageSize.height + '&location='
            + item.data[0].position.latitude + ','
            + item.data[0].position.longitude + '&heading='
            + item.data[0].position.bearing + '&pitch=-0.76&key='
            + this.config.googleStreetViewAPIKey;
    }

    closePopup(): void {
        this.checkedDockerId = null;
        if (this.markerActive != null) {
            var icon = {
                url: this.providers[this.dockers['item' + this.markerActive].dockerType].icon,
                scaledSize: this.config.enableWideMarkers ? new google.maps.Size(this.config.markerActive.scaledSize.width, this.config.markerActive.scaledSize.height) : new google.maps.Size(this.config.marker.scaledSize.width, this.config.marker.scaledSize.height),
                anchor: this.config.enableWideMarkers ? new google.maps.Point(this.config.markerActive.anchor.offsetX, this.config.markerActive.anchor.offsetY) : new google.maps.Point(this.config.marker.anchor.offsetX, this.config.marker.anchor.offsetY)
            };
            this.markers['item' + this.markerActive].setIcon(icon);
        }
        this.markerActive = null;
    }

    updateDockerKeys(): void {
        this.dockerKeys = Object.keys(this.dockers);
    }

}