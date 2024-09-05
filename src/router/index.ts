// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ConvertPage from "../views/ConvertPage.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/convert", name: "ConvertPage", component: ConvertPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
