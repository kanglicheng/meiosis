# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](01-introduction.html) |
[Next >](03-streams.html) |
[Table of Contents](toc.html)

## 02 - Initial State and Actions

Meiosis is a pattern for managing application state. The idea is to have a top-level state
object, and simple ways to update the state.

Let's imagine a simple counter example. Our initial state might be:

```js
var initialState = {
  value: 0
};
```

A plain JavaScript object with a `value` property indicating the value of the counter.

Now, we want to create an action that increments the counter.

### Increment Action

We'll create an `actions` object with an `increment` function that increments the counter.

```javascript
var initialState = {
  value: 0
};

var actions = {
  increment: function() {
    initialState.value = initialState.value + 1;
  }
};
```

So we already have an initial state, and an actions object to update the state. However, this
approach is somewhat lacking: we are directly modifying a global variable. This forces the need
for the actions to have a reference to the global variable. Moreover, it gives us no control over
the flow of data - being able to know when something has changed so that we can react. Most
notable, we'll want to refresh the view when the state has been updated.

In the next section, we'll look at a way to gain control over the flow of data. When you are
ready, continue on to [03 - Streams](03-streams.html).

[Table of Contents](toc.html) |
[< Previous](01-introduction.html) |
[Next >](03-streams.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
