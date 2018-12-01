/* global m, O, getUrl, href */

/* 404 Not Found Page */

// eslint-disable-next-line no-unused-vars
const createNotFound = () => ({
  view: _vnode => m("div",
    m("div", "Not Found Page"),
    m("div", "Sorry, we could not find what you were looking 4...04"),
    m("div",
      m("a", href(getUrl("HomePage")), "Home Page")
    )
  )
});

/* Home Page */

// eslint-disable-next-line no-unused-vars
const createHome = () => ({
  view: _vnode => m("div", "Home Page")
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
    if (navigation.route.values && navigation.route.values.id) {
      const coffee = coffeeMap[navigation.route.values.id];
      update(Object.assign({ coffees, coffee: coffee.description }, navigation));
    }
    else {
      update(Object.assign({ coffees, coffee: O }, navigation));
    }
  },
  view: vnode => {
    const model = vnode.attrs.model;
    return m("div",
      m("p", "Coffee Page"),
      m("ul",
        model.coffees.map(coffee =>
          m("li", { key: coffee.id },
            m("a", href(getUrl("CoffeeDetailsPage", { id: coffee.id })),
              coffee.title),
            " ",
            m("button.btn.btn-default.btn-xs", {
              onclick: () =>
                navigate({ route: { id: "CoffeeDetailsPage", values: { id: coffee.id } } })
            }, coffee.title)
          )
        )
      ),
      model.coffee
    );
  }
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
const createBeer = () => ({
  onNavigate: ({ update, navigation }) => {
    update({ pleaseWait: true });

    loadBeers().then(beers => {
      update(Object.assign({ pleaseWait: false, beers }, navigation));
    });
  },
  view: vnode =>
    m("div",
      m("p", "Beer Page"),
      m("ul",
        vnode.attrs.model.beers.map(beer =>
          m("li", { key: beer.id },
            m("a", href(getUrl("BeerDetailsPage", { id: beer.id })),
              beer.title),
            " ",
            m("button.btn.btn-default.btn-xs",
              { onclick: _evt =>
                m.route.set(getUrl("BeerDetailsPage", { id: beer.id }))
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
    update(Object.assign({ beer: beerMap[navigation.route.values.id].description }, navigation)),

  view: vnode => m("p", vnode.attrs.model.beer)
});
