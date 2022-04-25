import { ServiceOrder } from "../types";
import { ServiceOrder as PlaceWithId } from "@prisma/client";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a place using passed place
       * @example cy.createPlace(place)
       */
      createPlace(place: ServiceOrder): void;

      /**
       * Custom command to get the ID of passed place
       * @example cy.getPlaceId(place)
       */
      getPlaceId(place: ServiceOrder): void;

      /**
       * Custom command to update a place using passed place
       * @example cy.createPlace(place)
       */
      deletePlace(place: ServiceOrder): void;

      /**
       * Custom command to delete every test place of the database
       * @example cy.deleteAllTestPlaces()
       */
      deleteAllTestPlaces(): void;
    }
  }
}

Cypress.Commands.add("createPlace", (place) => {
  cy.request("POST", "/api/protected/places", place).then((response) => {
    expect(response.status).equal(200);
  });
});

Cypress.Commands.add("getPlaceId", (place) => {
  cy.request("/api/public/places").then((response) => {
    const allPlaces: PlaceWithId[] = response.body.body;
    const result = allPlaces.find((requestPlace) => {
      return requestPlace.equipment === place.equipment;
    });

    expect(result).not.be.undefined;
    cy.wrap(result?.id).as("placeId");
  });
});

Cypress.Commands.add("deletePlace", (place) => {
  cy.getPlaceId(place);

  cy.get("@placeId").then((placeID) => {
    cy.request("DELETE", "/api/protected/place/" + placeID).then((response) => {
      expect(response.status).equal(200);
    });
  });
});

Cypress.Commands.add("deleteAllTestPlaces", () => {
  cy.request("/api/public/places").then((response) => {
    const allPlaces: PlaceWithId[] = response.body.body;
    allPlaces.forEach((place) => {
      if (place.brand === place.brand) {
        cy.signIn();
        cy.request("DELETE", "/api/protected/place/" + place.id).then((response) => {
          expect(response.status).equal(200);
        });
      }

      if (place.attendedBy === place.attendedBy) {
        cy.signIn();
        cy.request("DELETE", "/api/protected/place/" + place.id).then((response) => {
          expect(response.status).equal(200);
        });
      }
    });
  });
});

export {};
