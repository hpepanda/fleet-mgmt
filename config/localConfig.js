"use strict";

module.exports = {
    port: process.env.PORT || 8020,
    binaryDataMongoUri: process.env.MONGODB_URL ||  "mongodb://localhost:27017/docker"
};