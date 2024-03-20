<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomDialog from "@/components/CustomDialog.vue";
import axios from "axios";

const email = ref("");
const verifyCode = ref("");
const newPassword = ref("");
const newPasswordCheck = ref("");

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

async function onClickPasswordChange() {
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

  if (newPassword.value === "") {
    openDialog("비밀번호를 입력해주세요");
    return;
  }

  if (newPasswordCheck.value === "") {
    openDialog("비밀번호 확인을 입력해주세요");
    return;
  }

  if (newPassword.value !== newPasswordCheck.value) {
    openDialog("비밀번호가 일치하지 않습니다");
    return;
  }

  if (newPassword.value.length < 8) {
    openDialog("비밀번호는 8자 이상이어야 합니다");
    return;
  }

  try {
    const result = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "api/v1/auth/password/reset",
      {
        email: email.value,
        verificationCode: verifyCode.value,
        password: newPassword.value,
      }
    );

    const accessToken = result.data.accessToken;
    const refreshToken = result.data.refreshToken;
    openDialog("비밀번호가 변경되었습니다");
    //@ts-ignore
    toApp.postMessage(JSON.stringify({ accessToken, refreshToken }));
    isLoading.value = false;
  } catch (e) {
    openDialog("비밀번호 변경에 실패했습니다");
    isLoading.value = false;
  }

  // 비밀번호 변경 로직
}

async function sendVerificationMes() {
  if (isVerifiactionCodeSending.value) return;
  isVerificationCodeSent.value = true;
  isVerifiactionCodeSending.value = true;
  await axios.post(
    import.meta.env.VITE_BACKEND_URL +
      "api/v1/auth/join/email/verificationCode/send",
    {
      email: email.value,
    }
  );
  openDialog("인증번호가 발송되었습니다. 이메일을 확인해주세요");
  isVerifiactionCodeSending.value = false;
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
          {{
            isVerifiactionCodeSending
              ? "전송중"
              : isVerificationCodeSent
                ? "재전송"
                : "인증번호 발송"
          }}
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
        label="신규비밀번호"
        type="password"
        v-model="newPassword"
        placeholder="비밀번호"
        class="margin-top-10"
      />
      <CustomInput
        label="신규비밀번호 확인"
        type="password"
        v-model="newPasswordCheck"
        placeholder="비밀번호 확인"
        class="margin-top-10"
      />

      <button class="main-btn margin-top-40" @click="onClickPasswordChange">
        비밀번호 바꾸기
      </button>
      <custom-dialog
        :show-dialog="showDialog"
        :dialog-content="dialogContent"
      ></custom-dialog>
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
