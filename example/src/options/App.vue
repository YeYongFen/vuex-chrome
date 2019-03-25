<template>
  <div>
    <p>Setting HTML!</p>

    <button @click="incrementCounter">
      increment
    </button>

    <button @click="decrementCounter">
      decrement
    </button>

    <p> {{ counter }} </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: mapState(['counter']),
  methods: {
    ...mapActions(['incrementCounter', 'decrementCounter']),
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
