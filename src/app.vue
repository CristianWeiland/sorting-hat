<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'app',
  components: {
    Home,
  },
};
</script>

<style>
</style>
