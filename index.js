const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { resolvers } = require("./src/resolvers");
const { typeDefs } = require("./src/typeDefs");
const { putObject } = require("./src/putObject");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

putObject();

startStandaloneServer(server, {
  listen: { port: 4000 },
});

module.exports = { resolvers, typeDefs, server };
