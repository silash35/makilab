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

const filterCpfOrCnpj = (string) => {
  string = filterString(string);
  if (string === null) {
    return null;
  }
  string = string.replace(/\D/g, "");

  if (string.length === 11) {
    string = string.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
  } else if (string.length === 14) {
    string = string.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
  }

  return string;
};

const filterPhoneNumber = (string) => {
  string = filterString(string);
  if (string === null) {
    return null;
  }
  string = string.replace(/\D/g, "");

  if (string.length === 8) {
    string = string.replace(/^(\d{4})(\d{4}).*/, "+55 71 $1-$2");
  } else if (string.length === 9) {
    string = string.replace(/^(\d{5})(\d{4}).*/, "+55 71 $1-$2");
  } else if (string.length === 10) {
    string = string.replace(/^(\d{2})(\d{4})(\d{4}).*/, "+55 $1 $2-$3");
  } else if (string.length === 11) {
    string = string.replace(/^(\d{2})(\d{5})(\d{4}).*/, "+55 $1 $2-$3");
  } else if (string.length === 12) {
    string = string.replace(/^(\d{2})(\d{2})(\d{4})(\d{4}).*/, "+$1 $2 $3-$4");
  } else if (string.length === 13) {
    string = string.replace(/^(\d{2})(\d{2})(\d{5})(\d{4}).*/, "+$1 $2 $3-$4");
  }
  return string;
};

const filterZip = (string) => {
  string = filterString(string);
  if (string === null) {
    return null;
  }

  string = string.replace(/\D/g, "");
  if (string.length === 8) {
    string = string.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
  }
  return string;
};

export { filterCpfOrCnpj, filterDate, filterPhoneNumber, filterString, filterZip };
