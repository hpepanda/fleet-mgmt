##Binary data server
Branch name: binary-server
 
Environment variables configuration:
 
MONGODB_URL to configure mongodb url
PORT to configure app port
USE_ONLY_CACHE=”true” to disable data storing
 
 
##Sensors data server
Branch name: data-server
 
Environment variables configuration:
MONGODB_URL to configure mongodb url
PORT to configure app port
POINT_TTL to configure ttl (in seconds)
 
 
##GPS simulator
Branch name: gps-simulator
 
Environment variables configuration:
CONFIGURATION =
{
  "BINARY_DATA_SERVER": "http://research-binary-data-server.52.35.15.130.nip.io/telemetry",
  "DOCKER_TYPE": "stackato_local",
  "DOCKER_ID": "stackato_122", - unique docker id
  "INSTANCE_IP": "52.35.15.130", - dynamic value
  "INSTANCE_PORT": "3322", - dynamic value
  "GPS": [  - Paris GPS coordinates
    48.88921361391563,
    2.3060989379882812,
    48.82709641375401,
    2.3850631713867188
  ]
}
 
APPLY_CF_ENV = “true” – only for stackato
 
 
##DOCKER-UI
Branch name: ui

Configuration can be found in the: “docker-ui/”
 
UI map center configuration
"mapCenter": {
    "lat": 48.8575954,
    "lng": 2.3424055
  }
 
Data source configuration
"connections": [
    {
      "server": "http://research-sensors-data-provider.52.35.15.130.nip.io",
      "port": 80
    }
  ]