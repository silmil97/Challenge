const typeDefs = `#graphql
  type Object {
    Key: String
    LastModified: String
  }
  enum Sort {
    asc
    desc
  }
  input BucketOrderByInput {
    LastModified: Sort
    Key: Sort
  }
  type Query {
    bucket(order: BucketOrderByInput, offset: Int, limit: Int): [Object]
  }
  type PutObject {
    httpStatusCode: Int!
  }
  type Mutation {
    putObject(fileName: String!, body: String!): PutObject
  }

`;
module.exports = { typeDefs };
