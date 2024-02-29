import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
  {
    path: "/kakao-callback",
    component: () => import("@/views/KakaoCallback.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
