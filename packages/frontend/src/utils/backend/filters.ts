const isString = (variable: unknown): variable is string => {
  return typeof variable === "string" && variable.length > 0;
};

export const filterString = (variable: unknown) => {
  return isString(variable) ? variable : null;
};

export const filterDate = (variable: unknown, fail = false) => {
  if (variable === null || variable === undefined || variable === "") {
    return null;
  }

  // Check if the date is valid
  if (!isNaN(Date.parse(variable as string))) {
    return new Date(variable as string);
  } else {
    if (fail) {
      throw new Error("Invalid data: Date");
    }
    return null;
  }
};

export const filterCpfOrCnpj = (variable: unknown) => {
  let string = filterString(variable);
  if (string === null) {
    return null;
  }

  // Remove all non-numeric characters
  string = string.replace(/\D/g, "");

  if (string.length === 11) {
    string = string.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
  } else if (string.length === 14) {
    string = string.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
  }

  return string;
};

export const filterPhoneNumber = (variable: unknown) => {
  let string = filterString(variable);
  if (string === null) {
    return null;
  }

  // Remove all non-numeric characters
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

export const filterZip = (variable: unknown) => {
  let string = filterString(variable);
  if (string === null) {
    return null;
  }

  // Remove all non-numeric characters
  string = string.replace(/\D/g, "");

  if (string.length === 8) {
    string = string.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
  }

  return string;
};
