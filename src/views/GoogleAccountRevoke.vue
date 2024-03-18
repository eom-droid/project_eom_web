<template>
  <div class="wrapper">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import router from "@/router";
import axios from "axios";

onMounted(() => {
  if (window.location.href.includes("?code=")) {
    revokeProcess();
  } else {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?client_id=" +
      import.meta.env.VITE_GOOGLE_CLIENT_ID +
      "&redirect_uri=" +
      import.meta.env.VITE_GOOGLE_REVOKE_REDIRECT_URI +
      "&response_type=code&scope=email%20profile";
  }
});

async function revokeProcess() {
  try {
    const code = window.location.href.split("?code=")[1].split("&")[0];

    await axios.delete(
      import.meta.env.VITE_BACKEND_URL + "api/v1/user/me/google",

      { data: { code: code }, withCredentials: true }
    );

    //@ts-ignore
    toApp.postMessage("complete");
  } catch (e) {}
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 5px solid #fff;
  animation: prixClipFix 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
