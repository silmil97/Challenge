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

module.exports = {
  getDateInMs,
  compareDateAsc,
  compareDateDesc,
  compareNameAsc,
  compareNameDesc,
};
