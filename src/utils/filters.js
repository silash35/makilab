const filterString = (string) => {
  if (typeof string === "string" && string.length > 1) {
    return string;
  } else {
    return null;
  }
};

const filterNumber = (string) => {
  if (filterString(string) === null) {
    return null;
  } else {
    return Number(string);
  }
};

export { filterNumber, filterString };
