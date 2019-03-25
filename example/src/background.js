import store from './store';

store.watch(function (state, getter) {
  console.log(getter.counter);
});
