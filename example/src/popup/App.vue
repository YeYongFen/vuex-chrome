<template>
  <div class="app">
    <button @click="incrementCounter">
      increment
    </button>

    <button @click="decrementCounter">
      decrement
    </button>

    <p
      class="link"
      @click="toOption"
    >
      To Setting
    </p>

    <p> {{ counter }} </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data () {
    return {};
  },

  computed: mapState(['counter']),

  methods: {
    ...mapActions(['incrementCounter', 'decrementCounter']),

    toOption () {
      const url = 'options/options.html';
      chrome.tabs.create({
        url: url,
      });
    },
  },
};
</script>

<style >
  .app{
    width: 100px;
    height: 200px;
  }

  .link{
    color: orange;
    cursor: pointer;
    text-decoration: underline;
  }

</style>
