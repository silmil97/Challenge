const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
} = require("./functions");

const buckets = [
  {
    name: "The Awakening",
    creationDate: "2019-12-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "City of Glass",
    creationDate: "2009-12-11T23:32:47+00:00",
    location: "",
    link: "",
  },
];

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
    buckets(order: BucketOrderByInput): [Bucket]
  }
`;

const resolvers = {
  Query: {
    buckets: (parent, args, contextValue, info) => {
      if (args.order == undefined) {
        return buckets;
      }
      if (args.order.creationDate == "asc") {
        return buckets.sort(compareDateAsc);
      }
      if (args.order.creationDate == "desc") {
        return buckets.sort(compareDateDesc);
      }
      if (args.order.name == "asc") {
        return buckets.sort(compareNameAsc);
      }
      if (args.order.name == "desc") {
        return buckets.sort(compareNameDesc);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
});

module.exports = { resolvers, typeDefs, server };
