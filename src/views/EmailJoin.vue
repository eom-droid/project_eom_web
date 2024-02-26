<script setup lang="ts">
import { ref } from "vue";
import CustomInput from "@/components/CustomInput.vue";

const email = ref("");
const verifyCode = ref("");
const password = ref("");
const passwordCheck = ref("");
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
        <button class="sub-btn sub-btn-width-height">인증번호 발송</button>
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

      <button class="main-btn margin-top-40">회원가입</button>
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
