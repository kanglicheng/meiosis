/* global m, getUrl, Route */

/* 404 Not Found Page */

// eslint-disable-next-line no-unused-vars
const createNotFound = () => ({
  view: _model => m("div",
    m("div", "Not Found Page"),
    m("div", "Sorry, we could not find what you were looking 4...04"),
    m("div",
      m("a", { href: getUrl(Route.of.HomePage()) }, "Home Page")
    )
  )
});

/* Home Page */

// eslint-disable-next-line no-unused-vars
const createHome = () => ({
  view: _model => m("div", "Home Page")
});

/* Coffee Page */

const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

// eslint-disable-next-line no-unused-vars
const createCoffee = ({ navigate }) => ({
  onNavigate: ({ navigation, update }) => {
    if (navigation.route.value && navigation.route.value.id) {
      const coffee = coffeeMap[navigation.route.value.id];
      update(model => Object.assign(model, { coffees, coffee: coffee.description }, navigation));
    }
    else {
      update(model => Object.assign(model, { coffees, coffee: null }, navigation));
    }
  },
  view: model => m("div",
    m("p", "Coffee Page"),
    m("ul",
      model.coffees.map(coffee =>
        m("li", { key: coffee.id },
          m("a", { href: getUrl(Route.of.CoffeeDetailsPage({ id: coffee.id })) },
            coffee.title),
          " ",
          m("button.btn.btn-default.btn-xs", {
            onclick: () =>
              navigate({ route: Route.of.CoffeeDetailsPage({ id: coffee.id }) })
          }, coffee.title)
        )
      )
    ),
    model.coffee
  )
});

/* Beer Page */

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const loadBeers = () => new Promise(resolve =>
  setTimeout(() => resolve(beers), 1000));

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

// eslint-disable-next-line no-unused-vars
const createBeer = ({ navigate }) => ({
  onNavigate: ({ update, navigation }) => {
    update(model => Object.assign(model, { pleaseWait: true }));

    loadBeers().then(beers => {
      update(model => Object.assign(model, { pleaseWait: false, beers }, navigation));
    });
  },
  view: model =>
    m("div",
      m("p", "Beer Page"),
      m("ul",
        model.beers.map(beer =>
          m("li", { key: beer.id },
            m("a", { href: getUrl(Route.of.BeerDetailsPage({ id: beer.id })) },
              beer.title),
            " ",
            m("button.btn.btn-default.btn-xs",
              { onclick: _evt =>
                navigate({ route: Route.of.BeerDetailsPage({ id: beer.id }) })
              },
              beer.title
            )
          )
        )
      )
    )
});

/* Beer Details Page */

// eslint-disable-next-line no-unused-vars
const createBeerDetails = () => ({
  onNavigate: ({ update, navigation }) =>
    update(model => Object.assign(model,
      { beer: beerMap[navigation.route.value.id].description }, navigation)),

  view: model => m("p", model.beer)
});
