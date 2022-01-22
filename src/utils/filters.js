const filterString = (string) => {
  if (typeof string === "string" && string.length > 1) {
    return string;
  } else {
    return null;
  }
};

const filterDate = (string) => {
  if (filterString(string) === null) {
    return null;
  } else {
    return new Date(string);
  }
};

export { filterDate, filterString };
