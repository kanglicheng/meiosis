/* global superouter */

// eslint-disable-next-line no-unused-vars
const Route = superouter.type("Route", {
  HomePage: "/",
  CoffeePage: "/coffee",
  CoffeeDetailsPage: "/coffee/:id",
  BeerPage: "/beer",
  BeerDetailsPage: "/beer/:id",
  NotFoundPage: "/:404+"
});

const parseUrl = (hash = document.location.hash || "#/") => {
  const url = hash.substring(1);
  const route = Route.matchOr(() => Route.of.HomePage(), url);
  return { route };
};

// eslint-disable-next-line no-unused-vars
const getUrl = route => "#" + Route.toURL(route);

// eslint-disable-next-line no-unused-vars
const listenToRouteChanges = navigate =>
  window.onpopstate = () => navigate(parseUrl());
