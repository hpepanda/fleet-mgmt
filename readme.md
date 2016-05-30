Binary data server for recieving events and store it in mongo db

Configuration:

Env variables

Mongodb database connection string
BINARY_DATABASE = mongodb://localhost/docker

Do not store raw data if true
USE_ONLY_CACHE = true

Server port
PORT = 8020