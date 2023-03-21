const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
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
