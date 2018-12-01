/* global m, O, createApp, prefix, routes */

// Meiosis Pattern Setup
const update = m.stream();
const navigate = m.stream();
const App = createApp(update, navigate);
const models = m.stream.scan(O, { route: { id: "HomePage" } }, update);

const element = document.getElementById("app");
m.route.prefix(prefix);
m.route(element, "/", Object.keys(routes).reduce((result, id) => {
  result[routes[id]] = {
    onmatch: values => navigate({ route: { id, values } }),
    render: () => m(App, { model: models() })
  };
  return result;
}, {}));

const defaultOnNavigate = ({ navigation, update }) => update(navigation);

navigate.map(navigation => (App.onNavigate[navigation.route.id]
  || defaultOnNavigate)({ model: models(), update, navigation, navigate }));
