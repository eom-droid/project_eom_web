<template>
  <div class="wrapper">
    <span class="loader"></span>

    <p style="color: white">{{ shit }}</p>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { onMounted, ref } from "vue";
// import router from "@/router";

const shit = ref("");

onMounted(() => {
  loginProcess();
});

async function loginProcess() {
  try {
    const code = window.location.href.split("code=")[1];

    const result = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "api/v1/auth/join/web/kakao",
      {
        code: code,
      },
      {
        withCredentials: true,
      }
    );
    const accessToken = result.data.accessToken;
    const refreshToken = result.data.refreshToken;

    // 앱으로 토큰 전달
    //@ts-ignore
    toApp.postMessage(
      JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
    return;
  } catch (e) {
    //@ts-ignore
    Print.postMessage("catch");
    if (e instanceof AxiosError) {
      //@ts-ignore
      Print.postMessage(JSON.stringify(e.toJSON()));
    }
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
