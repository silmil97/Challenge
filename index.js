const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
  offsetLimitLoop,
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
  {
    name: "whatever",
    creationDate: "2012-12-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "hoolahop",
    creationDate: "2007-12-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "The cool",
    creationDate: "2019-07-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "The looser",
    creationDate: "2015-06-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "The Mushroom",
    creationDate: "2013-12-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "City of Youtube",
    creationDate: "2022-12-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "The BoBo",
    creationDate: "2011-12-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "City of Gaga",
    creationDate: "2002-03-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "The Awakawaka",
    creationDate: "2018-08-11T23:32:47+00:00",
    location: "",
    link: "",
  },
  {
    name: "City of Groo",
    creationDate: "2021-12-11T23:32:47+00:00",
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
    buckets(order: BucketOrderByInput, offset: Int, limit: Int): [Bucket]
  }
`;

const resolvers = {
  Query: {
    buckets: (parent, args, contextValue, info) => {
      if (buckets.length <= args.offset) {
        throw new Error("Offset bigger than list");
      }
      if (args.order == undefined) {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(args.offset, args.limit, buckets);
        }
        return buckets;
      }
      if (!!args.order.creationDate && !!args.order.name) {
        throw new Error("You can just sort by one criteria");
      }
      if (args.order.creationDate == "asc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            buckets.sort(compareDateAsc)
          );
        }
        return buckets.sort(compareDateAsc);
      }
      if (args.order.creationDate == "desc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            buckets.sort(compareDateDesc)
          );
        }
        return buckets.sort(compareDateDesc);
      }
      if (args.order.name == "asc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            buckets.sort(compareNameAsc)
          );
        }
        return buckets.sort(compareNameAsc);
      }
      if (args.order.name == "desc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            buckets.sort(compareNameDesc)
          );
        }
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
