/* eslint no-unused-vars: 0 */

// Tab defaults to page id. Indicate exceptions here.
const tabMap = {
  "BeerDetailsPage": "BeerPage"
};

// Function composition: compose(f, g) creates a new function h(x) = f(g(x))
const compose = (...funcs) => x =>
  funcs.reduceRight((value, func) => func(value), x);
