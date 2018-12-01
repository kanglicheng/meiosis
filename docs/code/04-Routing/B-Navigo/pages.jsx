/* global React, getUrl */

/* 404 Not Found Page */

// eslint-disable-next-line no-unused-vars
const createNotFound = () => ({
  view: _model => (<div>
    <div>Not Found Page</div>
    <div>Sorry, we could not find what you were looking 4...04</div>
    <div>
      <a href={getUrl("HomePage")}>Home Page</a>
    </div>
  </div>)
});

/* Home Page */

// eslint-disable-next-line no-unused-vars
const createHome = () => ({
  view: _model => (<div>Home Page</div>)
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
      update(model => Object.assign(model, { coffees, coffee: coffee.description }, navigation));
    }
    else {
      update(model => Object.assign(model, { coffees, coffee: null }, navigation));
    }
  },
  view: model => (
    <div>
      <p>Coffee Page</p>
      <ul>
        {model.coffees.map(coffee =>
          <li key={coffee.id}>
            <a href={getUrl("CoffeeDetailsPage", { id: coffee.id })}
            >{coffee.title}</a>
            {" "}
            <button className="btn btn-default btn-xs"
              onClick={() =>
                navigate({ route: { id: "CoffeeDetailsPage", values: { id: coffee.id } } })}>
              {coffee.title}
            </button>
          </li>
        )}
      </ul>
      {model.coffee}
    </div>
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
  view: model => (
    <div>
      <p>Beer Page</p>
      <ul>
        {model.beers.map(beer =>
          <li key={beer.id}>
            <a href={getUrl("BeerDetailsPage", { id: beer.id })}
            >{beer.title}</a>
            {" "}
            <button className="btn btn-default btn-xs"
              onClick={() =>
                navigate({ route: { id: "BeerDetailsPage", values: { id: beer.id } } })}>
              {beer.title}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
});

/* Beer Details Page */

// eslint-disable-next-line no-unused-vars
const createBeerDetails = () => ({
  onNavigate: ({ update, navigation }) =>
    update(model => Object.assign(model,
      { beer: beerMap[navigation.route.values.id].description }, navigation)),

  view: model => (<p>{model.beer}</p>)
});
