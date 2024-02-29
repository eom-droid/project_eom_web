import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
// import { initKakao } from "./utils/kakao";
// initKakao();
createApp(App).use(router).mount("#app");
