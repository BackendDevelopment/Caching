const axios = require('axios');
const { request, response } = require('express');
const Redis = require("ioredis");
const redis = new Redis();
const caching = async (request) => {
    try {
        const { url } = request.headers;
        const isCached = await redis.get(url);
        if (isCached) {
            return isCached;
        } else {
            const config = {
                method: 'get',
                url,
                headers: {},
                timeout: 20000
            };
            const { data, status } = await axios(config);
            const value = typeof data === "object" ? JSON.stringify(data) : data;
            const promise = await redis.pipeline().set(url, value).get(url).exec();
            return JSON.parse(promise[1][1]);
        }
    } catch (error) {
        return error;
    }
}
module.exports = caching;