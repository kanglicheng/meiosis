/* global compose, BeerDetailsPage, CoffeeDetailsPage, HomePage,
   React, ReactRouterDOM */

const { Link } = ReactRouterDOM;

/* 404 Not Found Page */

// eslint-disable-next-line no-unused-vars
const createNotFound = navigator => _update => () => (
  <div>
    <div>Not Found Page</div>
    <div>Sorry, we could not find what you were looking 4...04</div>
    <div>
      <Link to={navigator.getUrl(HomePage)}>Home Page</Link>
    </div>
  </div>
);

/* Home Page */

// eslint-disable-next-line no-unused-vars
const createHome = _navigator => _update => () => (
  <div>Home Page</div>
);

/* Coffee Page */

const coffees = [
  { id: "c1", description: "Coffee 1" },
  { id: "c2", description: "Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const loadCoffees = () => new Promise(resolve =>
  setTimeout(() => resolve(coffees), 1));

const loadCoffee = params => new Promise(resolve =>
  setTimeout(() => resolve(coffeeMap[params.id]||"")), 1);

// eslint-disable-next-line no-unused-vars
const createCoffee = navigator => update => ({
  navigating: (params, navigate) => {
    loadCoffees().then(coffees => {
      const assignCoffees = model => Object.assign(model, { coffees, coffee: null });

      if (params && params.id) {
        loadCoffee(params).then(coffee => {
          navigate(compose(
            model => Object.assign(model, { coffee: coffee.description }),
            assignCoffees
          ));
        });
      }
      else {
        navigate(assignCoffees);
      }
    });
  },
  view: model => (
    <div>
      <p>Coffee Page</p>
      {model.coffees.map(coffee => <span key={coffee.id}>
        <a href={navigator.getUrl(CoffeeDetailsPage, { id: coffee.id })}>{coffee.id}</a>
        {" "}
      </span>)}
      {model.coffee}
    </div>
  )
});

/* Beer Page */

const loadBeer = () => new Promise(resolve =>
  setTimeout(() => resolve(beerList), 1));

const beerList = [
  { id: "b1", title: "Beer 1" },
  { id: "b2", title: "Beer 2" }
];

// eslint-disable-next-line no-unused-vars
const createBeer = navigator => update => class extends React.Component {
  loadData() {
    loadBeer().then(beerList => {
      update(model => Object.assign(model, { beerList }));
    });
  }
  componentWillMount() {
    this.loadData();
  }
  render() {
    const model = this.props.model;
    return (
      <div>
        <p>Beer Page</p>
        <ul>
          {model.beerList && model.beerList.map(beer =>
            <li key={beer.id}>
              <Link to={navigator.getUrl(BeerDetailsPage, { id: beer.id })}
              >{beer.title}</Link>
              {" "}
              <button className="btn btn-default btn-xs"
                onClick={() =>
                  navigator.navigateTo(BeerDetailsPage, { id: beer.id })}>
                {beer.title}
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
};

// eslint-disable-next-line no-unused-vars
const createBeerDetails = _navigator =>  update => class extends React.Component {
  loadData(id) {
    update(model => Object.assign(model, { beerId: id }));
  }
  componentWillMount() {
    this.loadData(this.props.match.params.id);
  }
  componentDidUpdate(previous) {
    const id = this.props.match.params.id;
    if (id !== previous.match.params.id) {
      this.loadData(id);
    }
  }
  render() {
    const model = this.props.model;
    return (<p>Details of beer {model.beerId}</p>);
  }
};
