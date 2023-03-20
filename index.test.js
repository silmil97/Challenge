const { typeDefs, resolvers, server } = require("./index.js");
const { ApolloServer } = require("@apollo/server");

it("bucket list returns all needed fields", async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation({
    query: `query test {
      buckets {
        name, 
        creationDate, 
        link, 
        location
      }
    }`,
  });

  response.body.singleResult.data?.buckets.map((element) => {
    expect(element.name).toBeDefined();
    expect(element.creationDate).toBeDefined();
    expect(element.link).toBeDefined();
    expect(element.location).toBeDefined();
  });
  expect(response.body.singleResult.errors).toBeUndefined();
});

test("the list can be in order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: ) {
      buckets(order: $order) {
        name, 
        creationDate, 
        link, 
        location
      }
    }`,
  });
});
