describe("Sign in API - POST", () => {
  it("should not return token if password is wrong", () => {
    const testValues = [undefined, null, true, false, "", "admin", 1, "password1", "pass word"];

    testValues.forEach((testValue) => {
      cy.request({
        method: "POST",
        url: "/api/auth/signin",
        body: { password: testValue },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).equal(401);
      });
    });
  });
});
