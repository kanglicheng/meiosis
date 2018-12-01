/* global Navigo */

// eslint-disable-next-line no-unused-vars
const routes = {
  HomePage: "/",
  CoffeePage: "/coffee",
  CoffeeDetailsPage: "/coffee/:id",
  BeerPage: "/beer",
  BeerDetailsPage: "/beer/:id",
  NotFoundPage: "/:404+"
};

const router = new Navigo(null, true);

// eslint-disable-next-line no-unused-vars
const getUrl = (id, values = {}) => router.generate(id, values);

// eslint-disable-next-line no-unused-vars
const listenToRouteChanges = navigate => {
  const navigoRoutes = Object.keys(routes).reduce((result, id) => {
    result[routes[id]] = {
      as: id,
      uses: values => navigate({ route: { id, values } })
    };
    return result;
  }, {});
  router.on(navigoRoutes).resolve();
};

/*
router.notFound(() =>
  update(model => Object.assign(model,
    { pageId: null, url: document.location.hash }))
);
*/
