const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

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

const getDateInMs = (dateIso) => {
  return new Date(dateIso).getTime();
};

const compareDateAsc = (a, b) => {
  return getDateInMs(a.creationDate) - getDateInMs(b.creationDate);
};

const compareDateDesc = (a, b) => {
  return getDateInMs(b.creationDate) - getDateInMs(a.creationDate);
};

const compareNameAsc = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const compareNameDesc = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }
  return 0;
};

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
        return buckets.sort(compareDateDesc);
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
