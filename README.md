# Fleet Management System
The Fleet Management System it is a navigation software which displays moving of the vehicles on the map in the real time. The main goal of the system is not track vehicles, but to demonstrate advantages that provides by Stackato platform for easy scaling of any types of applications in real time. Because the Stackato platform allows us to increase/decrease instances of the applications by simply changing the settings in the GUI of the administration panel.

![Fleet Management UI](https://cloud.githubusercontent.com/assets/20835203/17626514/357df7a6-60b6-11e6-9acd-86f15dd163cd.png)


The software needed for work of the system can be found in this repository. All parts of the system are distributed through the different branches, so, for installing a specific application in generally you need to:
+ Clone the current repository to your PC:

    ```
    git clone https://github.com/hpepanda/fleet-mgmt.git && cd fleet-mgmt
    ```
+ Switch from master to the other branch depending what application you need:

    ```
    git checkout <server_name>
    ```

For your convenience, all the software which can be found in the current repository listed in the table below:

Server Name|Branch Name|Description
-----------|-----------|-----------
Binary Data Server|binary-server|
Sensors Data Server|data-server|
User Interface|gps-simulator|
GPS Simulator|ui|

###OLD:
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
