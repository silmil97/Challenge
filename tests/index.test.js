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
        Key, 
        LastModified, 
         
        
      }
    }`,
  });

  response.body.singleResult.data?.bucket.map((element) => {
    expect(element.Key).toBeDefined();
    expect(element.LastModified).toBeDefined();
  });
  expect(response.body.singleResult.errors).toBeUndefined();
});

test("the list can be sorted by date in ascending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        LastModified,
      }
    }`,
    variables: {
      order: {
        LastModified: "asc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(+element.LastModified).toBeGreaterThanOrEqual(
        +bucket[index - 1]?.LastModified
      );
    }
  });
});

test("the list can be sorted by date in descending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        LastModified
      }
    }`,
    variables: {
      order: {
        LastModified: "desc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(+element.LastModified).toBeLessThanOrEqual(
        +bucket[index - 1]?.LastModified
      );
    }
  });
});

test("the list can be sorted by Key in ascending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        Key,
      }
    }`,
    variables: {
      order: {
        Key: "asc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(element.Key.localeCompare(bucket[index - 1]?.Key)).toBe(1);
    }
  });
});

test("the list can be sorted by Key in descending order", async () => {
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        Key
      }
    }`,
    variables: {
      order: {
        Key: "desc",
      },
    },
  });
  const bucket = response.body.singleResult.data?.bucket;
  bucket.forEach((element, index) => {
    if (index > 0 && index < bucket.length) {
      expect(element.Key.localeCompare(bucket[index - 1]?.Key)).toBe(-1);
    }
  });
});

test("limit and offset can be set", async () => {
  const offsetResponse = await server.executeOperation({
    query: `query test($order: BucketOrderByInput, $offset: Int, $limit: Int) {
      bucket(order: $order, offset: $offset, limit: $limit) {
        Key
      }
    }`,
    variables: {
      order: {
        Key: "desc",
      },
      limit: 2,
      offset: 1,
    },
  });
  const response = await server.executeOperation({
    query: `query test($order: BucketOrderByInput) {
      bucket(order: $order) {
        Key
      }
    }`,
    variables: {
      order: {
        Key: "desc",
      },
    },
  });
  const offsetBuckets = offsetResponse.body.singleResult.data?.bucket;
  const bucket = response.body.singleResult.data?.bucket;
  // console.log(offsetResponse)
  expect(offsetBuckets.length).toBe(2);
  expect(offsetBuckets[0].Key).toBe(bucket[2].Key);
});
