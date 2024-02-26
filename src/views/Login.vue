<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomDialog from "@/components/CustomDialog.vue";
import axios from "axios";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const showDialog = ref(false);
const dialogContent = ref("");

function openDialog(content: string) {
  dialogContent.value = content;
  showDialog.value = true;
  setTimeout(() => {
    showDialog.value = false;
  }, 2000);
}

function onClickLogin() {
  if (isLoading.value) return;
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
  //validation
  if (email.value === "") {
    openDialog("이메일을 입력해주세요");
    return;
  }
  // 이메일 형식 검증
  const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegExp.test(email.value)) {
    openDialog("이메일 형식이 올바르지 않습니다");
    return;
  }

  if (password.value === "") {
    openDialog("이메일을 입력해주세요");
    return;
  }

  emailLogin({
    email: email.value,
    password: password.value,
  });
}

async function emailLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await axios.post(
      "http://localhost:3001/api/v1/auth/login/email",

      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(result.headers.toJSON());
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="flex">
      <CustomInput label="이메일" type="email" v-model="email" />
      <CustomInput
        label="비밀번호"
        type="password"
        v-model="password"
        class="margin-top-10"
      />

      <button class="main-btn margin-top-30" @click="onClickLogin">
        <span v-if="isLoading">로그인 중...</span>
        <span v-else>로그인</span>
      </button>
      {{ showDialog }}
      <custom-dialog
        :show-dialog="showDialog"
        :dialog-content="dialogContent"
      ></custom-dialog>

      <div class="join-pwforget-wrapper">
        <router-link to="/email-join">이메일 회원가입</router-link>
        <router-link to="/password-reset">비밀번호 까묵</router-link>
      </div>

      <div class="sns-login-wrapper">
        <p>소셜 로그인(추천)</p>
        <div class="sns-login-btn-wrapper">
          <img src="@/assets/imgs/logo/kakao_logo.png" />
          <!-- <img src="@/assets/imgs/logo/naver_logo.png" /> -->
          <img src="@/assets/imgs/logo/google_logo.png" />
          <img src="@/assets/imgs/logo/apple_logo.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 568px;
  margin: 0 auto;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  color: white;
  display: flex;
  align-items: center;
}

.flex {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.margin-top-10 {
  margin-top: 10px;
}
.margin-top-30 {
  margin-top: 30px;
}

.sns-button {
  background-color: #000;
  border: none;
  cursor: pointer;
}

.join-pwforget-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px solid white;
}

.join-pwforget-wrapper a {
  line-height: 50px;
  text-align: center;
  width: 50%;
  height: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  text-decoration: none;
}

.sns-login-wrapper {
  width: 100%;
  margin-top: 40px;
  text-align: center;
}

.sns-login-wrapper p {
  margin-bottom: 24px;
}

.sns-login-btn-wrapper {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.sns-login-btn-wrapper img {
  width: 40px;
  cursor: pointer;
}
</style>
