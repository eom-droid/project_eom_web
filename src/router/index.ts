import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/email-join",
    component: () => import("@/views/EmailJoin.vue"),
  },
  {
    path: "/password-reset",
    component: () => import("@/views/PasswordReset.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
