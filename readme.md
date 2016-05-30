Binary data server for recieving events and store it in mongo db

Configuration:

Env variables

Mongodb database connection string
BINARY_DATABASE = mongodb://localhost/docker

Configuration server uri (Optional)
CONFIG_SERVER_URI = http://192.168.100.194:8084/api/cfg/

Do not store raw data if true
USE_ONLY_CACHE = true