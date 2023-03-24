const {
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
  offsetLimitLoop,
} = require("./functions");
// const { bucket } = require("../mock/bucket");
const { getBucket } = require("./getBucket");

const bucket = getBucket();
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
      if (!!args.order.LastModified && !!args.order.Key) {
        throw new Error("You can just sort by one criteria");
      }
      if (args.order.LastModified == "asc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(args.offset, args.limit, bucket);
        }
        return bucket.then((data) => data.sort(compareDateAsc));
      }
      if (args.order.LastModified == "desc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(args.offset, args.limit, bucket);
        }
        return bucket.then((data) => data.sort(compareDateDesc));
      }
      if (args.order.Key == "asc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(args.offset, args.limit, bucket);
        }
        return bucket.then((data) => data.sort(compareNameAsc));
      }
      if (args.order.Key == "desc") {
        if (!!args.offset || !!args.limit) {
          return offsetLimitLoop(args.offset, args.limit, bucket);
        }
        return bucket.then((data) => data.sort(compareNameDesc));
      }
    },
  },
};

module.exports = { resolvers };
