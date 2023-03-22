const { server } = require("../index.js");
const { resolvers } = require("../src/resolvers.js");
const { typeDefs } = require("../src/typeDefs.js");
const { ApolloServer } = require("@apollo/server");
const { getDateInMs } = require("../src/functions.js");

it("bucket list returns all needed fields", async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation({
    query: `query test {
      bucket {
        name, 
        creationDate, 
        link, 
        location
      }
    }`,
  });

  response.body.singleResult.data?.bucket.map((element) => {
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
      bucket(order: $order) {
        creationDate,
      }
    }`,
    variables: {
      order: {
        creationDate: "asc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(getDateInMs(element.creationDate)).toBeGreaterThanOrEqual(
        getDateInMs(bucket[index - 1]?.creationDate)
      );
    }
  });
});

test("the list can be sorted by date in descending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        creationDate
      }
    }`,
    variables: {
      order: {
        creationDate: "desc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(getDateInMs(element.creationDate)).toBeLessThanOrEqual(
        getDateInMs(bucket[index - 1]?.creationDate)
      );
    }
  });
});

test("the list can be sorted by name in ascending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        name,
      }
    }`,
    variables: {
      order: {
        name: "asc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(element.name.localeCompare(bucket[index - 1]?.name)).toBe(1);
    }
  });
});

test("the list can be sorted by name in descending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        name
      }
    }`,
    variables: {
      order: {
        name: "desc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(element.name.localeCompare(bucket[index - 1]?.name)).toBe(-1);
    }
  });
});

test("limit and offset can be set", async () => {
  const offsetResponse = await server.executeOperation({
    query: `query test($order: BucketOrderByInput, $offset: Int, $limit: Int) {
      bucket(order: $order, offset: $offset, limit: $limit) {
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
      bucket(order: $order) {
        name
      }
    }`,
    variables: {
      order: {
        name: "desc",
      },
    },
  });
  const offsetBuckets = offsetResponse.body.singleResult.data?.bucket;
  const bucket = response.body.singleResult.data?.bucket;
  expect(offsetBuckets.length).toBe(5);
  expect(offsetBuckets[0].name).toBe(bucket[2].name);
});
