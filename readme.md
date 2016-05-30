Sensors data server aggregates data from mongodb and streams to the connected websocket clients

Configuration:

Env variables

Mongodb database connection string
BINARY_DATABASE = mongodb://localhost/docker

Configuration server uri (Optional)
CONFIG_SERVER_URI = http://192.168.100.194:8084/api/cfg/

Server port
PORT = 5001

Point ttl in seconds
POINT_TTL=60