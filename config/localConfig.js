"use strict";

module.exports = {
    port: process.env.PORT || 5001,
    binaryDataMongoUri: process.env.BINARY_DATABASE || process.env.MONGODB_URL || "mongodb://localhost:27017/docker",
    pointTtl: process.env.POINT_TTL || 60
};