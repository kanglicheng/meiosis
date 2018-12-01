/* global m, getUrl, Route, tabMap,
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
      const component = components[model.route.case];
      const currentTab = tabMap[model.route.case] || model.route.case;
      const isActive = tab => tab === currentTab ? ".active" : "";

      return (
        m("div",
          m("nav.navbar.navbar-default",
            m("ul.nav.navbar-nav",
              m("li" + isActive("HomePage"),
                m("a", { href: getUrl(Route.of.HomePage()) }, "Home")
              ),
              m("li" + isActive("CoffeePage"),
                m("a", { href: getUrl(Route.of.CoffeePage()) }, "Coffee")
              ),
              m("li" + isActive("BeerPage"),
                m("a", { href: getUrl(Route.of.BeerPage()) }, "Beer")
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigate({ route: Route.of.HomePage() }) },
                  "Home"
                )
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigate({ route: Route.of.CoffeePage() }) },
                  "Coffee"
                )
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigate({ route: Route.of.BeerPage() }) },
                  "Beer"
                )
              )
            )
          ),
          component.view(model),
          // Show or hide the Please Wait modal. See public/css/style.css
          m("div", { style: { visibility: model.pleaseWait ? "visible" : "hidden" } },
            m("div.modal",
              m("div.box",
                m("p", "Loading, please wait...")
              )
            )
          )
        )
      );
    }
  };
};