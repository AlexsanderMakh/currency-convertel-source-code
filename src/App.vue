<template>
  <div>
    <AppHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
});
</script>

<style lang="scss">
@import "./styles/main.scss";

body {
  font-family: "Roboto", sans-serif;
  background: radial-gradient(circle, #000428, #004e92); // Космический фон
  color: #ffffff;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Roboto", sans-serif;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

a {
  color: #00d1ff; // Космический голубой
  text-decoration: none;
}

a:hover {
  color: #ffffff;
  text-shadow: 0 0 5px #00d1ff;
}
</style>
