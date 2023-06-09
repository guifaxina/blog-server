import pino from 'pino'
import helmet from 'helmet'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './api/schema'
import { Query } from './api/resolvers/query'
import { Mutation } from './api/resolvers/mutation'

const app = express()

export const logger = pino()

app.use(helmet())

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  }
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 }
})

logger.info(`Server ready at: ${url}`)
