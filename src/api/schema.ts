export const typeDefs = `#graphql
  type Query {
    hello: String!
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author!
  }

  type Author {
    name: String!
    lastName: String!
    email: String!
    password: String!
    profilePic: String!
  }

  input CreateAuthorInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
    profilePic: String!
  }
`
