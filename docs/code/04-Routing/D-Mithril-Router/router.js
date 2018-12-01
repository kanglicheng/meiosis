/* global pathToRegexp */

// eslint-disable-next-line no-unused-vars
const routes = {
  HomePage: "/",
  CoffeePage: "/coffee",
  CoffeeDetailsPage: "/coffee/:id",
  BeerPage: "/beer",
  BeerDetailsPage: "/beer/:id",
  NotFoundPage: "/:404..."
};

// Functions to generate URL from page id and values
const toPath = Object.keys(routes).reduce((result, id) => {
  result[id] = pathToRegexp.compile(routes[id]);
  return result;
}, {});

// eslint-disable-next-line no-unused-vars
const getUrl = (pageId, values = {}) => {
  const stringify = toPath[pageId];
  return stringify && stringify(values);
};
