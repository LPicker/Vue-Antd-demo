<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>demo Links</h2>
    <ul>
      <li v-for="linkItem of routes" :key="linkItem.path">
        <router-link :to="linkItem.path">
          {{ linkItem.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { routes } from "@/router";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js demo",
      routes: routes.filter((route) => route.path !== "/"),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
