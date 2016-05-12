Simulate GPS position and send it to the binary data server

Configuration:
Env variables

Docker type
DOCKER_TYPE = "Azure"

Unique docker id
DOCKER_ID = "Unique_1"

Ip address
IP = "127.0.0.1"

Binary data server
BINARY_DATA_SERVER = "http://192.168.1.6:8020/telemetry"


CONFIGURATION

{
    "BINARY_DATA_SERVER": "http://binary-data-server.52.35.15.130.nip.io/telemetry",
    "DOCKER_TYPE": "stackato",
    "DOCKER_ID": "stackato_1",
    "IP": "52.35.15.130",
    "GPS": [30.33, -97.85, 30.16, -97.59]
}