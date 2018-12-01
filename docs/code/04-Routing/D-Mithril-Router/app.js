/* global m, href, createBeer, createBeerDetails, createCoffee, createHome,
createNotFound, getUrl, tabMap */

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
    view: vnode => {
      const model = vnode.attrs.model;
      // Get the component and tab for the current page.
      const Component = components[model.route.id];
      const currentTab = tabMap[model.route.id] || model.route.id;
      const isActive = tab => tab === currentTab ? ".active" : "";

      return (
        m("div",
          m("nav.navbar.navbar-default",
            m("ul.nav.navbar-nav",
              m("li" + isActive("HomePage"),
                m("a", href(getUrl("HomePage")), "Home")
              ),
              m("li" + isActive("CoffeePage"),
                m("a", href(getUrl("CoffeePage")), "Coffee")
              ),
              m("li" + isActive("BeerPage"),
                m("a", href(getUrl("BeerPage")), "Beer")
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigate({ route: { id: "HomePage" } }) },
                  "Home"
                )
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigate({ route: { id: "CoffeePage" } }) },
                  "Coffee"
                )
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigate({ route: { id: "BeerPage" } }) },
                  "Beer"
                )
              )
            )
          ),
          m(Component, { model }),
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