import {bootstrap} from 'angular2/platform/browser';
import {DockerAppComponent} from './components/docker-app.component';
import {ConfigService} from "./services/getconfig.service";
import {HTTP_PROVIDERS} from 'angular2/http';
import {ConnectionService} from './services/connection.service';
import 'rxjs/Rx';

bootstrap(DockerAppComponent, [HTTP_PROVIDERS, ConfigService, ConnectionService]);