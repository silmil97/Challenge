const { getDateInMs } = require("./functions");

it("function returns date in milliseconds", () => {
  expect(getDateInMs("2019-02-11T23:32:47+00:00")).toBe(1549927967000);
});
