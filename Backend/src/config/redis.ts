

import { createClient } from "redis";
import { env } from "../config/env";

const redisClient=createClient({
    url:env.REDIS_URL || 'redis://localhost:6379' 

})

redisClient.on("error",(err)=>{
    console.log("RedisClient_Error:",err)
})


export const connectRedis = async () => {
    try {
      await redisClient.connect();
      console.log('Connected to Redis successfully');
    } catch (error) {
      console.log('Failed to connect to Redis:', error);
      process.exit(1); // Exit if Redis connection fails (optional)
    }
  };
  
 
  export default redisClient;