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
`;
module.exports = { typeDefs };
