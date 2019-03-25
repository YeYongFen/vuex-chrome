import Vue from 'vue';
import Vuex from 'vuex';
// import VuexWebExtensions from '../../../dist/vuex-chrome.es';
import VuexChromePlugin from '../../../src/index';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  getters,
  mutations,
  actions,
  plugins: [
    VuexChromePlugin()
  ],
});
