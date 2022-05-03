export default (() => {
  if (process.env.PASSWORD == undefined) {
    throw new Error("PASSWORD env variable not set");
  }

  return [{ id: 0, name: "admin", accessTypes: ["admin"], password: process.env.PASSWORD }];
})();
