<template>
  <div class="wrapper">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import axios from "axios";

onMounted(() => {
  if (window.location.href.includes("?code=")) {
    revokeProcess();
  } else {
    window.location.href =
      "https://appleid.apple.com/auth/authorize?response_type=code&client_id=" +
      import.meta.env.VITE_APPLE_CLIENT_ID +
      "&redirect_uri=" +
      import.meta.env.VITE_APPLE_REVOKE_REDIRECT_URI;
  }
});

async function revokeProcess() {
  try {
    const code = window.location.href.split("?code=")[1].split("&")[0];

    await axios.delete(
      import.meta.env.VITE_BACKEND_URL + "api/v1/user/me/apple",
      { data: { code: code }, withCredentials: true }
    );

    // 앱으로 토큰 전달
    //@ts-ignore
    toApp.postMessage("complete");
    return;
  } catch (e) {
    // router.replace("/");
  }
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
