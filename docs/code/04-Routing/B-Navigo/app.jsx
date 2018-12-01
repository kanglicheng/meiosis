/* global React, getUrl, tabMap,
createBeer, createBeerDetails, createCoffee, createHome, createNotFound  */

// eslint-disable-next-line no-unused-vars
const createApp = (update, navigate) => {
  const coffeeComponent = createCoffee({ update, navigate });

  // Register the pages, with the key (page id) the corresponding component
  const components = {
    HomePage: createHome({ update, navigate }),
    CoffeePage: coffeeComponent,
    CoffeeDetailsPage: coffeeComponent,
    BeerPage: createBeer({ update, navigate }),
    BeerDetailsPage: createBeerDetails({ update, navigate }),
    NotFoundPage: createNotFound()
  };

  return {
    onNavigate: Object.keys(components).reduce((result, id) => {
      if (components[id].onNavigate) {
        result[id] = components[id].onNavigate;
      }
      return result;
    }, {}),
    view: model => {
      // Get the component and tab for the current page.
      const component = components[model.route.id];
      const currentTab = tabMap[model.route.id] || model.route.id;
      const isActive = tab => tab === currentTab ? ".active" : "";

      return (
        <div>
          <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
              <li className={isActive("HomePage")}>
                <a href={getUrl("HomePage")}>Home</a>
              </li>
              <li className={isActive("CoffeePage")}>
                <a href={getUrl("CoffeePage")}>Coffee</a>
              </li>
              <li className={isActive("BeerPage")}>
                <a href={getUrl("BeerPage")}>Beer</a>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigate({ route: { id: "HomePage" } })}>Home</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigate({ route: { id: "CoffeePage" } })}>Coffee</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigate({ route: { id: "BeerPage" } })}>Beer</button>
              </li>
            </ul>
          </nav>
          {component.view(model)}
          {/* Show or hide the Please Wait modal. See public/css/style.css */}
          <div style={{visibility: model.pleaseWait ? "visible" : "hidden"}}>
            <div className="modal">
              <div className="box">
                <p>Loading, please wait...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
};