const typeDefs = `#graphql
  type Bucket {
    name: String
    creationDate: String
    location: String
    link: String
  }
  enum Sort {
    asc
    desc
  }
  input BucketOrderByInput {
    creationDate: Sort
    name: Sort
  }
  type Query {
    bucket(order: BucketOrderByInput, offset: Int, limit: Int): [Bucket]
  }
`;
module.exports = { typeDefs };
