const { typeDefs, resolvers, server } = require("./index.js");
const { ApolloServer } = require("@apollo/server");
const { getDateInMs } = require("./functions.js");

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

test("the list can be sorted by date in ascending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      buckets(order: $order) {
        name, 
        creationDate, 
        link, 
        location
      }
    }`,
    variables: {
      order: {
        creationDate: "asc",
      },
    },
  });
  const buckets = response.body.singleResult.data?.buckets;
  buckets.forEach((element, index) => {
    if (index > 0 && index < buckets.length) {
      expect(getDateInMs(element.creationDate)).toBeGreaterThanOrEqual(
        getDateInMs(buckets[index - 1]?.creationDate)
      );
    }
  });
});

test("the list can be sorted by date in descending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      buckets(order: $order) {
        name, 
        creationDate, 
        link, 
        location
      }
    }`,
    variables: {
      order: {
        creationDate: "desc",
      },
    },
  });
  const buckets = response.body.singleResult.data?.buckets;
  buckets.forEach((element, index) => {
    if (index > 0 && index < buckets.length) {
      expect(getDateInMs(element.creationDate)).toBeLessThanOrEqual(
        getDateInMs(buckets[index - 1]?.creationDate)
      );
    }
  });
});

test("the list can be sorted by name in ascending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      buckets(order: $order) {
        name, 
        creationDate, 
        link, 
        location
      }
    }`,
    variables: {
      order: {
        name: "asc",
      },
    },
  });
  const buckets = response.body.singleResult.data?.buckets;
  buckets.forEach((element, index) => {
    if (index > 0 && index < buckets.length) {
      expect(element.name.localeCompare(buckets[index - 1]?.name)).toBe(1);
    }
  });
});
