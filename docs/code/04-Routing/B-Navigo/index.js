/* global flyd, createApp, listenToRouteChanges, ReactDOM */

// Meiosis Pattern Setup
const update = flyd.stream();
const navigate = flyd.stream();
const App = createApp(update, navigate);
const models = flyd.scan((model, func) => func(model),
  { route: { id: "HomePage" } }, update);

const element = document.getElementById("app");
models.map(model => { ReactDOM.render(App.view(model), element); });

const defaultOnNavigate = ({ navigation, update }) =>
  update(model => Object.assign(model, navigation));

navigate.map(navigation => (App.onNavigate[navigation.route.id]
  || defaultOnNavigate)({ model: models(), update, navigation, navigate }));

listenToRouteChanges(navigate);
