<template>
  <div v-if="showDialog" class="dialog">
    <p>{{ dialogContent }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showDialog: {
    type: Boolean,
    required: true,
  },
  dialogContent: {
    type: String,
    default: "",
  },
});
</script>

<style>
.dialog {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  color: black;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
