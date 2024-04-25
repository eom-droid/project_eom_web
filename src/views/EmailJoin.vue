<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomDialog from "@/components/CustomDialog.vue";
import axios from "axios";

const email = ref("");
const verifyCode = ref("");
const password = ref("");
const passwordCheck = ref("");

const isLoading = ref(false);
const isVerificationCodeSent = ref(false);
const isVerifiactionCodeSending = ref(false);

const showDialog = ref(false);
const dialogContent = ref("");

function openDialog(content: string) {
  dialogContent.value = content;
  showDialog.value = true;
  setTimeout(() => {
    showDialog.value = false;
  }, 2000);
}

async function onClickJoin() {
  if (isLoading.value) return;
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);

  if (email.value === "") {
    openDialog("이메일을 입력해주세요");
    return;
  }

  if (verifyCode.value === "") {
    openDialog("인증번호를 입력해주세요");
    return;
  }

  if (password.value === "") {
    openDialog("비밀번호를 입력해주세요");
    return;
  }

  if (passwordCheck.value === "") {
    openDialog("비밀번호 확인을 입력해주세요");
    return;
  }

  if (password.value !== passwordCheck.value) {
    openDialog("비밀번호가 일치하지 않습니다");
    return;
  }

  try {
    const result = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "api/v1/auth/join/email",
      {
        email: email.value,
        password: password.value,
        verificationCode: verifyCode.value,
      }
    );

    const accessToken = result.data.accessToken;
    const refreshToken = result.data.refreshToken;
    //@ts-ignore
    toApp.postMessage(JSON.stringify({ accessToken, refreshToken }));
    isLoading.value = false;
  } catch (e) {
    openDialog("회원가입에 실패했습니다");
    isLoading.value = false;
  }
}

async function sendVerificationMes() {
  if (isVerifiactionCodeSending.value) return;
  try {
    isVerificationCodeSent.value = true;
    isVerifiactionCodeSending.value = true;

    await axios.post(
      import.meta.env.VITE_BACKEND_URL +
        "api/v1/auth/join/email/verificationCode/send",
      {
        email: email.value,
      }
    );
    isVerifiactionCodeSending.value = false;
  } catch (e) {
    openDialog("인증번호 에러");
    //@ts-ignore
    toApp.postMessage(JSON.stringify(e));
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="flex">
      <div class="email-div">
        <CustomInput
          label="이메일"
          type="email"
          v-model="email"
          placeholder="이메일"
        />
        <button
          class="sub-btn sub-btn-width-height"
          @click="sendVerificationMes"
        >
          <div v-show="isVerifiactionCodeSending">
            <img
              src="@/assets/imgs/gif/circle-loading.gif"
              style="width: 20px; height: 20px"
            />
          </div>
          <span v-show="!isVerifiactionCodeSending">
            {{ isVerificationCodeSent ? "재전송" : "인증번호 발송" }}
          </span>
        </button>
      </div>

      <CustomInput
        label="인증번호"
        type="text"
        v-model="verifyCode"
        placeholder="인증번호"
        class="margin-top-10"
      />

      <CustomInput
        label="비밀번호"
        type="password"
        v-model="password"
        placeholder="비밀번호"
        class="margin-top-10"
      />
      <CustomInput
        label="비밀번호 확인"
        type="password"
        v-model="passwordCheck"
        placeholder="비밀번호 확인"
        class="margin-top-10"
      />

      <button class="main-btn margin-top-40" @click="onClickJoin">
        회원가입
      </button>
      <CustomDialog
        :showDialog="showDialog"
        :dialogContent="dialogContent"
      ></CustomDialog>
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
  margin: auto;

  flex-direction: column;
  align-items: center;
}

.margin-top-10 {
  margin-top: 10px;
}
.margin-top-40 {
  margin-top: 40px;
}

.sns-button {
  background-color: #000;
  border: none;
  cursor: pointer;
}

.email-div {
  width: 100%;
  display: flex;
  /* 아래로 정렬 */
  align-items: flex-end;
}

.sub-btn-width-height {
  width: 150px;
  height: 44px;
  margin-left: 12px;
  font-size: 15px;
  font-weight: 500;
}
</style>
