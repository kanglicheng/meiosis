/* global m, createApp, listenToRouteChanges, Route */

// Meiosis Pattern Setup
const update = m.stream();
const navigate = m.stream();
const App = createApp(update, navigate);
const models = m.stream.scan((model, func) => func(model),
  { route: Route.of.HomePage() }, update);

const element = document.getElementById("app");
models.map(model => { m.render(element, App.view(model)); });

const defaultOnNavigate = ({ navigation, update }) =>
  update(model => Object.assign(model, navigation));

navigate.map(navigation => (App.onNavigate[navigation.route.case]
  || defaultOnNavigate)({ model: models(), update, navigation, navigate }));

listenToRouteChanges(navigate);
