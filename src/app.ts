import pino from 'pino'
import cors from 'cors'
import express from 'express'
import http from 'http'
import session from 'express-session'
import RedisStore from 'connect-redis'
import { redis } from './utils/redis.config'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { typeDefs } from './api/schema'
import { Query } from './api/resolvers/query'
import { Mutation } from './api/resolvers/mutation'

declare module 'express-session' {
  export interface SessionData {
    userId: string
  }
}

interface IContext {
  req: express.Request
}

const monthDuration = 1000 * 60 * 60 * 24 * 30

const app = express()

export const logger = pino()

const httpServer = http.createServer(app)

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

const redisStore = new RedisStore({
  client: redis
})

async function startServer (): Promise<void> {
  await server.start()

  app.use('/graphql', cors(), express.json(), express.urlencoded({ extended: true }), session({
    store: redisStore,
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      maxAge: monthDuration
    }
  }), expressMiddleware(server, {
    context: async ({ req }) => ({ req })
  }))

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log('Server ready at: http://localhost:4000/graphql')
  await redis.connect()
  console.log('Redis connected')
}

void startServer()
