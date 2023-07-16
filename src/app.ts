import pino from 'pino'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { typeDefs } from './api/schema'
import { Query } from './api/resolvers/query'
import { Mutation } from './api/resolvers/mutation'

interface IContext {
  req: express.Request
}

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

async function startServer (): Promise<void> {
  await server.start()

  app.use('/graphql', cors(), express.json(), express.urlencoded({ extended: true }), expressMiddleware(server, {
    context: async ({ req }) => ({ req })
  }))

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log('Server ready at: http://localhost:4000/graphql')
}

void startServer()
