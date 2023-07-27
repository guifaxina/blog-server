import { createClient } from '@redis/client'

export const redis = createClient()

redis.on('error', err => { console.log('Redis Cleint Error', err) })
