import { RateLimiterRedis } from "rate-limiter-flexible";
import RedisClient from "@redis/client/dist/lib/client";
import { Redis } from "ioredis";

const redisClient = new Redis({ 
    host: 'redis-18202.c84.us-east-1-2.ec2.cloud.redislabs.com',
    port: 18202,
    password: 'bcZkeG3UaiyCtXnOursBtZZARM5CXu82'

});

const maxConsecutiveFailsByUserName = 5;

const limiterConsecutiveFailsByUsername = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_consecutive_username',
    points: maxConsecutiveFailsByUserName,
    duration: 60, // Store number for 60 seconds since first fail
    blockDuration: 60 * 2 // Block for 2 minutes
})

export {limiterConsecutiveFailsByUsername, maxConsecutiveFailsByUserName, redisClient}