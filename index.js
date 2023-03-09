const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const buckets = [
  {
    name: "The Awakening",
    creationDate: "2019-12-11T23:32:47+00:00",
  },
  {
    name: "City of Glass",
    creationDate: "2029-12-11T23:32:47+00:00",
  },
];

const typeDefs = `#graphql
  type Bucket {
    name: String
    creationDate: String
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

async function getUrl() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}
getUrl();
