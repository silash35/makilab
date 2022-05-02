const testSafety = (method: string, url: string, body?: any) => {
  cy.authFetch({
    method,
    url,
    body,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).equal(401);
    expect(response.body).contains("Unauthorized");
  });

  const tokenValues = [
    undefined,
    null,
    "",
    "token",
    "admin",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXvCJ9",
  ];

  tokenValues.forEach((token) => {
    localStorage.setItem("token", token);

    cy.authFetch({
      method,
      url,
      body,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(401);
      expect(response.body).contains("Unauthorized");
    });
  });
};

export default testSafety;
