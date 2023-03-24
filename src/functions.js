const getDateInMs = (dateIso) => {
  return new Date(dateIso).getTime();
};

const compareDateAsc = (a, b) => {
  return a.LastModified - b.LastModified;
};

const compareDateDesc = (a, b) => {
  return b.LastModified - a.LastModified;
};

const compareNameAsc = (a, b) => {
  const nameA = a.Key.toUpperCase();
  const nameB = b.Key.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const compareNameDesc = (a, b) => {
  const nameA = a.Key.toUpperCase();
  const nameB = b.Key.toUpperCase();
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }
  return 0;
};

const offsetLimitLoop = (offset, limit, buckets) => {
  const result = [];
  return buckets.then((data) => {
    for (let i = 0; i <= data.length; i++) {
      if (i >= offset || !offset) {
        result.push(data[i]);
      }
      if (limit && result.length === limit) {
        break;
      }
    }
    return result;
  });
};

module.exports = {
  offsetLimitLoop,
  getDateInMs,
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
};
