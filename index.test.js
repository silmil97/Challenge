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
        creationDate,
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
        creationDate
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

test("the list can be sorted by name in descending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      buckets(order: $order) {
        name
      }
    }`,
    variables: {
      order: {
        name: "desc",
      },
    },
  });
  const buckets = response.body.singleResult.data?.buckets;
  buckets.forEach((element, index) => {
    if (index > 0 && index < buckets.length) {
      expect(element.name.localeCompare(buckets[index - 1]?.name)).toBe(-1);
    }
  });
});

test("limit and offset can be set", async () => {
  const offsetResponse = await server.executeOperation({
    query: `query test($order: BucketOrderByInput, $offset: Int, $limit: Int) {
      buckets(order: $order, offset: $offset, limit: $limit) {
        name
      }
    }`,
    variables: {
      order: {
        name: "desc",
      },
      limit: 5,
      offset: 2,
    },
  });
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      buckets(order: $order) {
        name
      }
    }`,
    variables: {
      order: {
        name: "desc",
      },
    },
  });
  const offsetBuckets = offsetResponse.body.singleResult.data?.buckets;
  const buckets = response.body.singleResult.data?.buckets;
  expect(offsetBuckets.length).toBe(5);
  expect(offsetBuckets[0].name).toBe(buckets[2].name);
});
