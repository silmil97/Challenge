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
    creationDate: "2029-12-11T23:32:47+00:00",
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
  type Query {
    buckets: [Bucket]
  }
`;

const resolvers = {
  Query: {
    buckets: () => buckets,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
});

module.exports = { resolvers, typeDefs };
