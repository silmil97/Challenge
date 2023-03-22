const {
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
  offsetLimitLoop,
} = require("./functions");
const { bucket } = require("../mock/bucket");

const resolvers = {
  Query: {
    bucket: (parent, args, contextValue, info) => {
      if (bucket.length <= args.offset) {
        throw new Error("Offset bigger than list");
      }
      if (args.order == undefined) {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(args.offset, args.limit, bucket);
        }
        return bucket;
      }
      if (!!args.order.creationDate && !!args.order.name) {
        throw new Error("You can just sort by one criteria");
      }
      if (args.order.creationDate == "asc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            bucket.sort(compareDateAsc)
          );
        }
        return bucket.sort(compareDateAsc);
      }
      if (args.order.creationDate == "desc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            bucket.sort(compareDateDesc)
          );
        }
        return bucket.sort(compareDateDesc);
      }
      if (args.order.name == "asc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            bucket.sort(compareNameAsc)
          );
        }
        return bucket.sort(compareNameAsc);
      }
      if (args.order.name == "desc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(
            args.offset,
            args.limit,
            bucket.sort(compareNameDesc)
          );
        }
        return bucket.sort(compareNameDesc);
      }
    },
  },
};

module.exports = { resolvers };
