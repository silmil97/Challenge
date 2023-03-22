const getDateInMs = (dateIso) => {
  return new Date(dateIso).getTime();
};

const compareDateAsc = (a, b) => {
  return getDateInMs(a.creationDate) - getDateInMs(b.creationDate);
};

const compareDateDesc = (a, b) => {
  return getDateInMs(b.creationDate) - getDateInMs(a.creationDate);
};

const compareNameAsc = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const compareNameDesc = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
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
  for (let i = 0; i <= buckets.length; i++) {
    if (i >= offset || !offset) {
      result.push(buckets[i]);
    }
    if (limit && result.length === limit) {
      break;
    }
  }
  return result;
};

module.exports = {
  offsetLimitLoop,
  getDateInMs,
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
};
