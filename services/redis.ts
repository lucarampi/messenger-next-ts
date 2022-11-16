import Redis from "ioredis";

const redis = new Redis('redis://default:aee3c12db34247c2a5caff84d78cd85a@global-easy-tadpole-32178.upstash.io:32178')

export default redis;