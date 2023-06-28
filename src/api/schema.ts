export const typeDefs = `#graphql
  type Query {
    getAuthor(id: ID!): Author!
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author
    createPost(input: CreatePostInput!): Post
  }

  type Author {
    id: ID!
    name: String!
    lastName: String!
    email: String!
    password: String!
    profilePic: String!
    isAccountActive: Boolean!
    activationCode: String
  }

  input CreateAuthorInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
    profilePic: String!
  }

  type Post {
    id: ID!
    authorId: String!
    title: String!
    description: String!
    readTime: Int!
    date: Date!
    tag: String!
    thumbnail: String!
    altText: String!
  }

  type CreatePostInput {
    title: String!
    description: String!
    tag: String!
    thumbnail: String!
    altText: String!
  }
`
