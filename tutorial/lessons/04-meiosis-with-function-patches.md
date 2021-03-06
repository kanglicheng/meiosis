# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](03-streams.html) |
[Next >](05-meiosis-with-patchinko.html) |
[Table of Contents](toc.html)

## 04 - Meiosis with Function Patches

In the previous lesson, [03 - Streams](03-streams.html), we started setting up the
Meiosis pattern:

- an `update` stream of **patches**
- a `states` stream of states, obtained with `scan` on the `update` stream and applying
an **accumulator**
- an `actions` object created by passing `update` and having functions that call `update`
to trigger state changes.

Our state had the following shape:

```js
{
  value: 0
}
```

Our patches were numbers such as `1` and `-1`, and our accumulator applied the patches to the
state by adding the number to `state.value`.

We are going to change our patches and accumulator function to be general-purpose, so that the
shape of our state can be much more flexible, and our actions can issue patches to make all sorts
of changes to the state.

### A Temperature Example

Let's build a temperature example with the following initial state:

```js
{
  temperature: {
    value: 22,
    units: "C"
  }
}
```

We can increase and decrease the value, as well as change the units betwen `C` (Celsius) and
`F` (Farenheit), converting the value in the process.

We need to:

- Decide the shape of our patches
- Write an accumulator function that will use those patches to produce the updated state.

In this section, we will use one approach using **function patches**. In the next section, we
will look at another approach - my personal favourite - using a small utility called Patchinko.

### Using Function Patches

Instead of using plain numbers as patches, which are limited to incrementing a counter, we can
use **functions**. Indeed, we can pass functions onto the `update` stream and use them in the
accumulator to update the state.

These functions receive the current state as a parameter, and return the updated state.
For example, to increment the temperature value:

```js
increment: function(amount) {
  update(function(state) {
    state.temperature.value += amount;
    return state;
  });
}
```

Now we need to use these function patches in the accumulator function. Remember that the
accumulator gets the current state and the incoming patch as parameters, and must return the
updated state. Since the incoming patches are functions, we just need to call them:

```js
var states = flyd.scan(function(state, patch) {
  return patch(state);
}, temperature.initialState, update);
```

Using the ES6 arrow function syntax, this would be:

```js
var states = flyd.scan((state, patch) => patch(state),
  temperature.initialState, update);
```

Either way, it's a simple way to create the stream of states.

Putting it all together, we have:

@flems code/04-meiosis-with-function-patches-01.js flyd 800

### Exercises

Try it out: notice that the initial state appears in the output on the right. Within the console,
type and then press Enter:

`actions.increment(2)`

`actions.changeUnits()`

In the output on the right, you'll see the updated states.

In the next section, [05 - Meiosis with Patchinko](05-meiosis-with-patchinko.html), we will look
at an alternative to function patches.

[< Previous](03-streams.html) |
[Next >](05-meiosis-with-patchinko.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
